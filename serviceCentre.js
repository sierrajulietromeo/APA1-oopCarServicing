export default class ServiceCentre {
    #plannedServices; 
    #serviceMenu;      

    constructor() {
        this.#plannedServices = new Map();
        this.#serviceMenu = new Map([
            ['basic', { 
                cost: 100, 
                duration: '1 hour',
                description: 'Basic inspection and fluid check'
            }],
            ['full', { 
                cost: 200, 
                duration: '2 hours',
                description: 'Complete vehicle service'
            }],
            ['diagnostic', { 
                cost: 50, 
                duration: '30 minutes',
                description: 'Computer diagnostic check'
            }]
        ]);
    }

    scheduleService(vehicle, serviceType) {
        if (!this.#serviceMenu.has(serviceType)) {
            console.log('❌ Error: Invalid service type');
            return false;
        }
        
        this.#plannedServices.set(vehicle.getInfo(), serviceType);
        const service = this.#serviceMenu.get(serviceType);
        console.log(`📅 Scheduled: ${serviceType} service for ${vehicle.getInfo()}`);
        console.log(`   Details: ${service.description}`);
        console.log(`   Cost: £${service.cost}`);
        console.log(`   Duration: ${service.duration}`);
        return true;
    }

    processPlannedServices() {
        console.log("\n🔧 Processing planned services:");
        this.#plannedServices.forEach((serviceType, vehicleInfo) => {
            const service = this.#serviceMenu.get(serviceType);
            console.log(`\nProcessing ${vehicleInfo}`);
            console.log(`Service type: ${serviceType}`);
            console.log(`Description: ${service.description}`);
            console.log(`Cost: £${service.cost}`);
            console.log(`Duration: ${service.duration}`);
        });
    }
}