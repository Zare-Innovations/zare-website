export const roleOptions = [
    { value: 'UI/UX Designer', label: 'UI/UX Designer' },
    {
        value: 'Fullstack Software Engineer',
        label: 'Fullstack Software Engineer',
    },
    {
        value: 'Back end Software Engineer',
        label: 'Back end Software Engineer',
    },
    {
        value: 'Front end Software Engineer',
        label: 'Front end Software Engineer',
    },
    {
        value: 'Mobile App Software Developer',
        label: 'Mobile App Software Developer',
    },
    { value: 'QA Engineer', label: 'QA Engineer' },
    {
        value: 'Customer Service Representative',
        label: 'Customer Service Representative',
    },
    { value: 'Virtual Assistant', label: 'Virtual Assistant' },
    {
        value: 'Back Office Support Specialist',
        label: 'Back Office Support Specialist',
    },
];

const rates = [
    { "role": "UI/UX Designer", "marketRate": 45, "zareRate": 20 },
    { "role": "Fullstack Software Engineer", "marketRate": 60, "zareRate": 28 },
    { "role": "Back end Software Engineer", "marketRate": 55, "zareRate": 26 },
    { "role": "Front end Software Engineer", "marketRate": 50, "zareRate": 25 },
    { "role": "Mobile App Software Developer", "marketRate": 55, "zareRate": 27 },
    { "role": "QA Engineer", "marketRate": 45, "zareRate": 22 },
    { "role": "Customer Service Representative", "marketRate": 25, "zareRate": 10 },
    { "role": "Virtual Assistant", "marketRate": 20, "zareRate": 8 },
    { "role": "Back Office Support Specialist", "marketRate": 22, "zareRate": 9 }
]


export function calculateSalary(roleName: string, weeklyHours: number, peopleCount: number, referenceData: typeof rates = rates) {
    const role = referenceData.find(r => r.role === roleName);
    if (!role) {
        throw new Error("Role not found in reference data.");
    }

    const monthlyHours = weeklyHours * 4;
    const marketCost = role.marketRate * monthlyHours * peopleCount;
    const zareCost = role.zareRate * monthlyHours * peopleCount;
    const savings = marketCost - zareCost;
    const percentSavings = ((savings / marketCost) * 100).toFixed(2);

    return {
        role: roleName,
        people: peopleCount,
        weeklyHours,
        monthlyHours,
        marketCost,
        zareCost,
        savings,
        percentSavings: `${percentSavings}%`
    };
}
