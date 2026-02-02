<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $query = Contact::with('company');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('firstname', 'like', "%$search%")
                    ->orWhere('lastname', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%");
            });
        }

        if ($request->filled('company_id')) {
            $query->where('company_id', $request->company_id);
        }

        $allowedSorts = ['firstname', 'lastname', 'email'];
        $sort = $request->get('sort');
        $direction = $request->get('direction', 'asc');

        if (
            in_array($sort, $allowedSorts, true) &&
            in_array($direction, ['asc', 'desc'], true)
        ) {
            $query->orderBy($sort, $direction);
        }

        return $query->paginate(10);
    }

    public function store(Request $request)
    {
        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required|email|unique:contacts,email',
            'company_id' => 'required|exists:companies,id',
        ]);

        return Contact::create($request->all());
    }

    public function show($id)
    {
        return Contact::with('company')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('contacts', 'email')->ignore($id),
            ],
            'company_id' => 'required|exists:companies,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $contact->update($validator->validated());
        return response()->json($contact);
    }

    public function destroy($id)
    {
        Contact::findOrFail($id)->delete();

        return Contact::with('company')->paginate(10);
    }

    public function reportByArea()
    {
        // Group contacts by company postcode (or name) and count them
        $data = DB::table('contacts')
            ->join('companies', 'contacts.company_id', '=', 'companies.id')
            ->select('companies.postcode as area', DB::raw('COUNT(contacts.id) as total'))
            ->groupBy('companies.postcode')
            ->get();

        return response()->json($data);
    }
}
