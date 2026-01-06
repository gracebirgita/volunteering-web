<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class EventAttendance extends Model
{
    use HasFactory;

    protected $table = 'events_attendances';
    protected $primaryKey = 'attendance_id';

    protected $fillable = [
        'registration_id',
        'attendance_date',
        'check_in',
        'check_out',
        'is_present',
    ];

    protected $casts = [
        'attendance_date' => 'date',
        'check_in'        => 'datetime:H:i',
        'check_out'       => 'datetime:H:i',
        'is_present'      => 'boolean',
    ];

    // =========================
    // RELATIONS
    // =========================

    /**
     * Attendance belongs to one event registration
     * (only approved registrations should have attendances)
     */
    public function registration()
    {
        return $this->belongsTo(
            EventRegistration::class,
            'registration_id',
            'registration_id'
        );
    }
}
