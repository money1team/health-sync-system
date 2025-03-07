
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { MOCK_PATIENTS } from "@/lib/mock-data";

const PatientsDemographics = () => {
  // Age groups calculation
  const ageGroups = MOCK_PATIENTS.reduce((acc, patient) => {
    if (patient.age < 18) {
      acc["0-17"] = (acc["0-17"] || 0) + 1;
    } else if (patient.age >= 18 && patient.age < 35) {
      acc["18-34"] = (acc["18-34"] || 0) + 1;
    } else if (patient.age >= 35 && patient.age < 50) {
      acc["35-49"] = (acc["35-49"] || 0) + 1;
    } else if (patient.age >= 50 && patient.age < 65) {
      acc["50-64"] = (acc["50-64"] || 0) + 1;
    } else {
      acc["65+"] = (acc["65+"] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const ageData = Object.entries(ageGroups).map(([name, value]) => ({
    name,
    value,
  }));

  // Gender calculation
  const genderGroups = MOCK_PATIENTS.reduce((acc, patient) => {
    acc[patient.gender] = (acc[patient.gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const genderData = Object.entries(genderGroups).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#2DD4BF', '#14B8A6', '#0D9488', '#0F766E', '#115E59'];
  const GENDER_COLORS = ['#2DD4BF', '#0F766E', '#134E4A'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Demographics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[200px]">
            <h3 className="text-sm font-medium mb-2 text-center">Age Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="h-[200px]">
            <h3 className="text-sm font-medium mb-2 text-center">Gender Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientsDemographics;
