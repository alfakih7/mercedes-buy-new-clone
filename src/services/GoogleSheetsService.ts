import axios from 'axios';

// Your API key should be stored in an environment variable in production
const API_KEY = 'AIzaSyCz5LVBN71WXDTxwJtZPWxl_laPK2Qjums';

export interface TranscriptData {
  customerId: string;
  transcript: string;
  firstName?: string;
  lastName?: string;
  loyalty?: {
    tier: string;
    points: number;
  }
}

class GoogleSheetsService {
  private readonly spreadsheetId: string;
  
  constructor(spreadsheetId: string) {
    this.spreadsheetId = spreadsheetId;
  }

  /**
   * Fetch data from a Google Sheet
   * @param range The range to fetch (e.g. 'Sheet1!A1:D10')
   * @returns Promise with the response data
   */
  async fetchSheetData(range: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/1BWU2SLNjTFK-4I0M8bALt5Wr8fJUpNuNbBjebbZkkNg/values/${range}`,
        {
          params: {
            key: API_KEY,
            valueRenderOption: 'UNFORMATTED_VALUE',
            dateTimeRenderOption: 'FORMATTED_STRING'
          }
        }
      );
      
      return response.data.values;
    } catch (error) {
      console.error('Error fetching Google Sheet data:', error);
      throw error;
    }
  }

  /**
   * Extract the first sentence or data point from a transcript cell
   * @param transcript The full transcript text
   * @returns The first sentence or meaningful data point
   */
  extractFirstDataPoint(transcript: string): string {
    if (!transcript) return '';
    
    // Try to extract the first sentence
    const firstSentence = transcript.split(/[.!?]\s+/)[0];
    
    // If the sentence is too long, limit it to a reasonable length
    if (firstSentence.length > 100) {
      return firstSentence.substring(0, 100) + '...';
    }
    
    return firstSentence;
  }

  /**
   * Get customer data with transcript summary
   * @returns Array of customer data with transcript summaries
   */
  async getCustomerTranscriptData(): Promise<TranscriptData[]> {
    try {
      // Assuming your sheet has columns for: CustomerId, FirstName, LastName, Transcript, etc.
      const range = 'sheet1!A2:E100'; // Skip header row and get data
      const sheetData = await this.fetchSheetData(range);
      
      if (!sheetData || !sheetData.length) {
        return [];
      }
      
      // Map the raw data to our interface
      return sheetData.map((row: any[]) => {
        const customerId = row[0] || '';
        const firstName = row[1] || '';
        const lastName = row[2] || '';
        const transcript = row[3] || '';
        const loyaltyPoints = parseInt(row[4] || '0', 10);
        
        // Determine loyalty tier based on points
        let loyaltyTier = 'Bronze';
        if (loyaltyPoints >= 10000) {
          loyaltyTier = 'Platinum';
        } else if (loyaltyPoints >= 5000) {
          loyaltyTier = 'Gold';
        } else if (loyaltyPoints >= 2000) {
          loyaltyTier = 'Silver';
        }
        
        return {
          customerId,
          firstName,
          lastName,
          transcript: this.extractFirstDataPoint(transcript),
          loyalty: {
            tier: loyaltyTier,
            points: loyaltyPoints
          }
        };
      });
    } catch (error) {
      console.error('Error getting customer transcript data:', error);
      throw error;
    }
  }
  
  /**
   * Get specific customer data by ID
   * @param customerId The customer ID to look for
   * @returns The customer data or null if not found
   */
  async getCustomerById(customerId: string): Promise<TranscriptData | null> {
    try {
      const customers = await this.getCustomerTranscriptData();
      const customer = customers.find(c => c.customerId === customerId);
      return customer || null;
    } catch (error) {
      console.error(`Error getting customer ${customerId}:`, error);
      throw error;
    }
  }
}

// Create a singleton instance with your spreadsheet ID
const googleSheetsService = new GoogleSheetsService('1BWU2SLNjTFK-4I0M8bALt5Wr8fJUpNuNbBjebbZkkNg');

export default googleSheetsService; 