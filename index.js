import { PetrolVehicle, ElectricVehicle, HybridVehicle } from './vehicles.js';
import ServiceCentre from './serviceCentre.js';

const main = () => {
    const serviceCenter = new ServiceCentre();

    const tesla = new ElectricVehicle("Tesla", "Model 3", 2023, "75kWh");
    const bmw = new PetrolVehicle("BMW", "M5", 2022, "4.4L");
    const toyota = new HybridVehicle("Toyota", "Prius", 2023, "1.8L", "8.8kWh");

    // Schedule future services
    console.log("\nScheduling services:");
    serviceCenter.scheduleService(tesla, "basic");
    serviceCenter.scheduleService(bmw, "full");
    serviceCenter.scheduleService(toyota, "premium");

    serviceCenter.completeService(toyota, "premium", "Full detail and software update");

    // Record completed services
    console.log("\nRecording completed services:");
    tesla.recordCompletedService("2023-01-01", "Software Update v2.1");
    bmw.recordCompletedService("2023-02-01", "Oil Change");

    // Process all planned services
    serviceCenter.processPlannedServices();

    // View costs and history
    console.log("\nTesla total costs:", serviceCenter.calculateTotalCosts(tesla));
    console.log("\nTesla service history:", serviceCenter.getAllServices(tesla));

};

main();


