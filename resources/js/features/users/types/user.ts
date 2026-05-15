export interface Role {
    id: number;
    name: string;
    guard_name: string;
}

export interface Department {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    birthday: string;
    gender: 'male' | 'female';
    address: string;
    status: 'active' | 'draft' | string;
    department_id: number;

    // Relationship တစ်ခုတည်းဆိုရင် Array မဟုတ်ဘဲ Object ပဲသုံးပါ
    department?: Department;
    roles?: Role[];

    created_at: string;
    updated_at: string;
}
