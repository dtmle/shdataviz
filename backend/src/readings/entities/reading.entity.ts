import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'readings' })
export class Reading {
    @PrimaryColumn({ type: 'text' })
    Serial_Number: string;

    @Column({ type: 'timestamp without time zone' })
    DateTime: Date;

    @Column({ type: 'text' })
    Device_ID: string;

    @Column({ type: 'text' })
    Device_Name: string;

    @Column({ type: 'text' })
    User_Device_Name: string;

    @Column({ type: 'text' })
    Device_Type: string;

    @Column({ type: 'text' })
    Device_Make: string;

    @Column({ type: 'text' })
    Device_Model: string;

    @Column({ type: 'text' })
    Device_Location: string;

    @Column({ type: 'numeric' })
    Wattage: number;
}
