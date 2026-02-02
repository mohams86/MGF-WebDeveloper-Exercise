<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\Company;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_email_must_be_unique_when_updating_contact()
    {
        $company = Company::factory()->create();

        $contact1 = Contact::factory()->create([
            'email' => 'test1@example.com',
            'company_id' => $company->id,
        ]);

        $contact2 = Contact::factory()->create([
            'email' => 'test2@example.com',
            'company_id' => $company->id,
        ]);

        $response = $this->putJson("/api/contacts/{$contact2->id}", [
            'firstname'  => 'Updated',
            'lastname'   => 'User',
            'email'      => 'test1@example.com', // duplicate
            'company_id' => $company->id,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }
}
