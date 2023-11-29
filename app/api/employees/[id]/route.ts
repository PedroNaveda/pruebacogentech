import { NextResponse } from 'next/server'

export function GET(){
    return NextResponse.json({
        message: 'Geting single Employ',  
    })
}

export function DELETE(){
    return NextResponse.json({
        message: 'Deleting single Employ',
    })
}

export function PUT(){
    return NextResponse.json({
        message: 'Updating single Employ',
    })
}