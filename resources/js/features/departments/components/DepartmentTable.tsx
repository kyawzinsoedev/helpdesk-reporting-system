import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import DepartmentFormModal from '@/features/departments/components/DepartmentFormModal';
import type { Department } from '../shcemas/departmentSchema';
import DeleteDepartmentDialog from './DeleteDepartmentDialog';

interface Props {
    departments: Department[];
}

export default function DepartmentTable({ departments }: Props) {
    return (
        <div className="overflow-hidden rounded-md border bg-card shadow-sm">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead>Id</TableHead>

                        <TableHead className="w-[300px]">Department</TableHead>

                        <TableHead>Code</TableHead>

                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {departments?.map((department) => (
                        <TableRow key={department.id}>
                            <TableCell>{department.id ?? '-'}</TableCell>

                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">
                                        {department.name}
                                    </span>

                                    <span className="text-sm text-muted-foreground">
                                        Department Information
                                    </span>
                                </div>
                            </TableCell>

                            <TableCell>
                                {department.department_code ?? '-'}
                            </TableCell>

                            <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                    <DepartmentFormModal
                                        mode="edit"
                                        department={department}
                                    />

                                    <DeleteDepartmentDialog
                                        department={department}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
