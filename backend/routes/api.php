
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Models\Company;

Route::options('/{any}', function () {
    return response()->json([], 204);
})->where('any', '.*');

//Report for contacts by area
Route::get('/contacts/report-by-area', [ContactController::class, 'reportByArea']);

//Contacts RESTful API
Route::apiResource('contacts', ContactController::class);

//Companies list for dropdown
Route::get('/companies', function() {
    return Company::all(['id', 'name']);
});
