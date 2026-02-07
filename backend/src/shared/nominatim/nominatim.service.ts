import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

export interface IndianHospital {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  location: {
    lat: number;
    lng: number;
  };
  type: string;
  phone?: string;
}

export const INDIAN_CITIES = {
  DELHI: { lat: 28.6139, lng: 77.2090, name: 'Delhi', state: 'Delhi' },
  MUMBAI: { lat: 19.0760, lng: 72.8777, name: 'Mumbai', state: 'Maharashtra' },
  BENGALURU: { lat: 12.9716, lng: 77.5946, name: 'Bengaluru', state: 'Karnataka' },
  HYDERABAD: { lat: 17.3850, lng: 78.4867, name: 'Hyderabad', state: 'Telangana' },
  CHENNAI: { lat: 13.0827, lng: 80.2707, name: 'Chennai', state: 'Tamil Nadu' },
  KOLKATA: { lat: 22.5726, lng: 88.3639, name: 'Kolkata', state: 'West Bengal' },
  PUNE: { lat: 18.5204, lng: 73.8567, name: 'Pune', state: 'Maharashtra' },
  AHMEDABAD: { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad', state: 'Gujarat' },
  JAIPUR: { lat: 26.9124, lng: 75.7873, name: 'Jaipur', state: 'Rajasthan' },
  LUCKNOW: { lat: 26.8467, lng: 80.9462, name: 'Lucknow', state: 'Uttar Pradesh' },
};

@Injectable()
export class NominatimService {
  private readonly logger = new Logger(NominatimService.name);
  private readonly baseUrl = 'https://nominatim.openstreetmap.org';
  
  constructor() {
    this.logger.log('✅ Nominatim service initialized for India');
  }

  /**
   * Search hospitals in Indian cities using Nominatim/OpenStreetMap
   */
  async searchHospitalsInIndia(
    cityName?: string,
    lat?: number,
    lng?: number,
  ): Promise<IndianHospital[]> {
    try {
      let searchLat: number, searchLng: number, city: any;

      if (cityName) {
        city = Object.values(INDIAN_CITIES).find(
          c => c.name.toLowerCase() === cityName.toLowerCase()
        );
        if (city) {
          searchLat = city.lat;
          searchLng = city.lng;
          this.logger.log(`🔍 Searching hospitals in ${city.name}, India`);
        }
      }

      if (lat && lng) {
        searchLat = lat;
        searchLng = lng;
      }

      if (!searchLat || !searchLng) {
        searchLat = INDIAN_CITIES.DELHI.lat;
        searchLng = INDIAN_CITIES.DELHI.lng;
        city = INDIAN_CITIES.DELHI;
      }

      // Search using Overpass API for better hospital data
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:5000,${searchLat},${searchLng});
          way["amenity"="hospital"](around:5000,${searchLat},${searchLng});
          relation["amenity"="hospital"](around:5000,${searchLat},${searchLng});
        );
        out center;
      `;

      const response = await axios.post(
        'https://overpass-api.de/api/interpreter',
        overpassQuery,
        {
          headers: {
            'Content-Type': 'text/plain',
            'User-Agent': 'IndiaHospitalSystem/1.0'
          },
          timeout: 30000
        }
      );

      const hospitals: IndianHospital[] = response.data.elements.map((element: any) => {
        const lat = element.lat || element.center?.lat;
        const lon = element.lon || element.center?.lon;
        
        return {
          id: `osm-${element.id}`,
          name: element.tags?.name || 'Hospital',
          address: this.buildAddress(element.tags),
          city: city?.name || cityName || 'Unknown',
          state: city?.state || 'Unknown',
          location: {
            lat: lat,
            lng: lon,
          },
          type: element.tags?.['healthcare'] || 'hospital',
          phone: element.tags?.phone || element.tags?.['contact:phone'],
        };
      }).filter(h => h.location.lat && h.location.lng);

      this.logger.log(`✅ Found ${hospitals.length} hospitals`);
      return hospitals.slice(0, 20); // Return top 20

    } catch (error) {
      this.logger.error('Error searching hospitals:', error.message);
      return this.getFallbackHospitals(cityName);
    }
  }

  /**
   * Get hospital details
   */
  async getHospitalDetails(osmId: string): Promise<IndianHospital | null> {
    try {
      const id = osmId.replace('osm-', '');
      const response = await axios.get(`${this.baseUrl}/lookup`, {
        params: {
          osm_ids: `N${id}`,
          format: 'json',
        },
        headers: { 'User-Agent': 'IndiaHospitalSystem/1.0' }
      });

      if (response.data && response.data.length > 0) {
        const place = response.data[0];
        return {
          id: osmId,
          name: place.display_name.split(',')[0],
          address: place.display_name,
          city: place.address?.city || place.address?.town || '',
          state: place.address?.state || '',
          location: {
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon),
          },
          type: place.type,
        };
      }
      return null;
    } catch (error) {
      this.logger.error('Error getting details:', error.message);
      return null;
    }
  }

  /**
   * Geocode Indian address using Nominatim
   */
  async geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: {
          q: `${address}, India`,
          format: 'json',
          limit: 1,
        },
        headers: { 'User-Agent': 'IndiaHospitalSystem/1.0' }
      });

      if (response.data && response.data.length > 0) {
        return {
          lat: parseFloat(response.data[0].lat),
          lng: parseFloat(response.data[0].lon),
        };
      }
      return null;
    } catch (error) {
      this.logger.error('Geocoding error:', error.message);
      return null;
    }
  }

  /**
   * Calculate distance between two points (Haversine formula)
   */
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private buildAddress(tags: any): string {
    const parts = [];
    if (tags['addr:street']) parts.push(tags['addr:street']);
    if (tags['addr:city']) parts.push(tags['addr:city']);
    if (tags['addr:state']) parts.push(tags['addr:state']);
    if (tags['addr:postcode']) parts.push(tags['addr:postcode']);
    return parts.join(', ') || 'Address not available';
  }

  /**
   * Fallback hospitals when API fails
   */
  private getFallbackHospitals(cityName?: string): IndianHospital[] {
    const city = cityName ? 
      Object.values(INDIAN_CITIES).find(c => c.name.toLowerCase() === cityName.toLowerCase()) :
      INDIAN_CITIES.DELHI;

    return [
      {
        id: 'fallback-1',
        name: `${city.name} General Hospital`,
        address: `${city.name}, ${city.state}`,
        city: city.name,
        state: city.state,
        location: { lat: city.lat + 0.01, lng: city.lng + 0.01 },
        type: 'hospital'
      },
      {
        id: 'fallback-2',
        name: `${city.name} Emergency Medical Center`,
        address: `${city.name}, ${city.state}`,
        city: city.name,
        state: city.state,
        location: { lat: city.lat - 0.01, lng: city.lng - 0.01 },
        type: 'hospital'
      }
    ];
  }

  getCities() {
    return Object.values(INDIAN_CITIES);
  }
}
