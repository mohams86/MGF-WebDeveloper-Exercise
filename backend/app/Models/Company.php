<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Company extends Model {
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['name','postcode'];
    public function contacts() {
        return $this->hasMany(Contact::class);
    }
}
