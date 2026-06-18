import DepartmentFormModal from '@/features/departments/components/DepartmentFormModal';
import DepartmentTable from '@/features/departments/components/DepartmentTable';
import type { Department } from '@/features/departments/shcemas/departmentSchema';

interface Props {
    departments: Department[];
}
export default function Index({ departments }: Props) {
    return (
        <div className="space-y-4 p-6">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Department Management
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your organization's departments.
                    </p>
                </div>

                {/* Create From  */}
                <DepartmentFormModal mode="create" />
            </div>

            {/* Table */}
            <DepartmentTable departments={departments} />
        </div>
    );
}
