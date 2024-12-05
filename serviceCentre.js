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
            }],
            ['premium', { 
                cost: 300, 
                duration: '3 hours',
                description: 'Premium service including detailed inspection, cleaning, and software updates'
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

    calculateTotalCosts(vehicle) {
        let total = 0;
        
        // Calculate costs from planned services
        this.#plannedServices.forEach((serviceType, vehicleInfo) => {
            if (vehicleInfo === vehicle.getInfo()) {
                total += this.#serviceMenu.get(serviceType).cost;
            }
        });
        
        // Calculate costs from completed services
        vehicle.getCompletedServices().forEach((serviceType) => {
            if (this.#serviceMenu.has(serviceType)) {
                total += this.#serviceMenu.get(serviceType).cost;
            }
        });
        
        return total;
    }
    getServiceHistory(vehicle) {
        const history = [];
        
        // Add completed services
        vehicle.getCompletedServices().forEach((serviceType, date) => {
            history.push({
                date,
                type: serviceType,
                status: 'completed',
                cost: this.#serviceMenu.get(serviceType)?.cost || 'Custom service'
            });
        });
        
        return history;
    }

    completeService(vehicle, serviceType, notes = '') {
        const vehicleInfo = vehicle.getInfo();
        if (!this.#plannedServices.has(vehicleInfo)) {
            return false;
        }
        
        const plannedService = this.#plannedServices.get(vehicleInfo);
        if (plannedService !== serviceType) {
            return false;
        }
        
        // Remove from planned services
        this.#plannedServices.delete(vehicleInfo);
        
        // Add to vehicle's completed services
        const date = new Date().toISOString().split('T')[0];
        vehicle.recordCompletedService(date, serviceType, notes);
        
        return true;
    }

    getAllServices(vehicle) {
        const allServices = [];
        const vehicleInfo = vehicle.getInfo();
        
        // Get planned services
        this.#plannedServices.forEach((serviceType, vInfo) => {
            if (vInfo === vehicleInfo) {
                allServices.push({
                    type: serviceType,
                    status: 'planned',
                    cost: this.#serviceMenu.get(serviceType).cost,
                    date: 'Pending'
                });
            }
        });
        
        // Get completed services
        vehicle.getCompletedServices().forEach((serviceType, date) => {
            allServices.push({
                type: serviceType,
                status: 'completed',
                cost: this.#serviceMenu.get(serviceType)?.cost || 'Custom service',
                date
            });
        });
        
        // Sort by date (completed services first)
        return allServices.sort((a, b) => {
            if (a.date === 'Pending') return 1;
            if (b.date === 'Pending') return -1;
            return new Date(b.date) - new Date(a.date);
        });
    }
}