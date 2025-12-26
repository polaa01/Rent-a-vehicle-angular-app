# Rent-a-vehicle-angular-app
This project represents a central web application used by employees of a vehicle rental system.
The application provides role-based access control, where available functionalities depend on the employee’s role in the system.

The system supports management and monitoring of vehicles, rentals, users, manufacturers, malfunctions, pricing, and statistics, ensuring efficient daily operations and decision-making.

The application supports the following employee roles:


ADMINISTRATORS have access to:

Vehicle Management Page
  - Vehicles are grouped by type (cars, bicycles, scooters, etc.)
  - Tabular display of all vehicle data
  - Create and delete vehicles
  - Upload vehicles via CSV file (custom-defined format)
Vehicle Details Page
  - Full details of a selected vehicle
  - View, add, and delete vehicle malfunctions
  - View all rentals related to the selected vehicle
Manufacturer Management
  - Full CRUD operations for vehicle manufacturers
User Management
  - Separate views for clients and employees
  - Block or unblock client accounts
Full CRUD operations for employee accounts



OPERATORS have access to:

Rental Overview Page
  - Read-only view of all rental information
Vehicle Map View
  - Visualization of vehicle locations (implemented as a grid-based map)
Client Management Page
  - View client accounts
  - Block or unblock client accounts
Malfunction Reporting
Create new malfunctions for vehicles


MANAGERS have access to:

- All Administrator features
- All Operator features
Statistics and Reports Page
  - Daily total revenue for a selected month (chart)
  - Number of malfunctions per vehicle
  - Total revenue grouped by vehicle type
  - Charts implemented using external libraries
Pricing Management
Definition and modification of rental price
