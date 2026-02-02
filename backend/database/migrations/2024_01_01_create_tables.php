
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('companies', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->string('postcode');
        });

        Schema::create('contacts', function (Blueprint $t) {
            $t->id();
            $t->string('firstname');
            $t->string('lastname');
            $t->string('email');
            $t->foreignId('company_id')->constrained();
            $t->softDeletes();
            $t->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('contacts');
        Schema::dropIfExists('companies');
    }
};
