
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stat } from "@/lib/types";

interface StatsCardProps {
  stat: Stat;
}

const StatsCard = ({ stat }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-health-100 flex items-center justify-center text-health-600">
          {stat.icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat.value}</div>
        {stat.change !== undefined && (
          <p className={`text-xs ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stat.change >= 0 ? '+' : ''}{stat.change}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
