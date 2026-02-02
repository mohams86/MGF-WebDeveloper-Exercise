<?php
namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use App\Models\Company;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller {
    public function contactsByArea() {
        return Company::select('postcode', DB::raw('count(contacts.id) as total'))
            ->leftJoin('contacts', function($j) {
                $j->on('companies.id','=','contacts.company_id')
                  ->whereNull('contacts.deleted_at');
            })
            ->groupBy('postcode')
            ->get();
    }
}
