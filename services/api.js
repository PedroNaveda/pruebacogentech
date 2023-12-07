const BASE_URL = 'http://localhost:3000/api';

export const GET = async () => {
      try {
        const response = await fetch(`${BASE_URL}/employees`);
        
        if (!response.ok) {
          throw new Error(`Error fetching employees: ${response.statusText}`);
        }
        
        return response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    export const POST = async () => {
        try {
          const response = await fetch(`${BASE_URL}/employees`);
          
          if (!response.ok) {
            throw new Error(`Error Creating employees: ${response.statusText}`);
          }
          
          return response.json();
        } catch (error) {
          console.error(error);
          throw error;
        }
      };
      export const DELETE = async () => {
        try {
          const response = await fetch(`${BASE_URL}/employees`);
          
          if (!response.ok) {
            throw new Error(`Error Creating employees: ${response.statusText}`);
          }
          
          return response.json();
        } catch (error) {
          console.error(error);
          throw error;
        }
      };
      export const allEmployees = async () => {
        try {
          const response = await fetch(`${BASE_URL}/allEmployees`);
          return response.json();
        } catch (error) {
          console.error('Error fetching employees with supervisor:', error);
          throw error;
        }
      };
    // ... otras funciones
