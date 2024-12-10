import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { useItems } from '@/shared/hooks/useItems';

export const DashboardCharts = () => {
  const { items } = useItems();

  // Prepare data for the category chart
  const categoryData = items.reduce((acc: { name: string; value: number }[], item) => {
    const existingCategory = acc.find(cat => cat.name === item.category);
    if (existingCategory) {
      existingCategory.value += item.value;
    } else {
      acc.push({ name: item.category, value: item.value });
    }
    return acc;
  }, []);

  // Prepare data for the status chart
  const statusData = items.reduce((acc: { name: string; value: number }[], item) => {
    const existingStatus = acc.find(stat => stat.name === item.status);
    if (existingStatus) {
      existingStatus.value++;
    } else {
      acc.push({ name: item.status, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <>
      <div className="rounded-lg bg-white p-4 shadow">
        <h3 className="mb-4 text-lg font-medium">Value by Category</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(value)
                }
              />
              <Bar dataKey="value" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <h3 className="mb-4 text-lg font-medium">Items by Status</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={(entry) => entry.name}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};