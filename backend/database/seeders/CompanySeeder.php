<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('companies')->insert([
            ['id' => 1, 'name' => 'Test Design Ltd', 'postcode' => 'L9'],
            ['id' => 2, 'name' => 'Untitled Construction Ltd', 'postcode' => 'NW1'],
            ['id' => 3, 'name' => 'PlaceHolder Service Ltd', 'postcode' => 'SK11'],
            ['id' => 4, 'name' => 'PlaceHolder Excavation PLC', 'postcode' => 'BT32'],
            ['id' => 5, 'name' => 'Example Excavation PLC', 'postcode' => 'SA64'],
            ['id' => 6, 'name' => 'Test Building PLC', 'postcode' => 'PA7'],
            ['id' => 7, 'name' => 'Example Construction PLC', 'postcode' => 'NE20'],
            ['id' => 8, 'name' => 'Example Design Ltd', 'postcode' => 'FK5'],
        ]);
    }
}
