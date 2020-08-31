import React from 'react';

export const capitalize = ( s ) => {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

export const formatKey = ( key ) => {
    return key.split( '_' )
        .map( str => capitalize( str ) )
        .join( ' ' );
}

export const toCurrency = ( num ) =>  {
    if ( num < 0 ) {
        return `-$${ Math.abs( num ) }`
    }

    return `$${ num }`;
}

export const formatIfNull = ( str ) => {
    return str ?? 'Not Set';
}

export const addZero =  num  => num < 10 ? `0${num}` : num

export const isNumber = ( elem ) => {
    return typeof elem === 'number';
}

export const takeBalanceOwed = ( totalPayed, totalDue ) => {
    return totalPayed - totalDue;
}


export const formatDate = ( d ) => {
    let [month, day, year]  = ( new Date( d ) ).toLocaleDateString().split("/");

    return `${ MONTHS[month] } ${ day }, ${ year }`
}


export const MONTHS = [ "January", "February", "March", "April", "May", 
                         "June", "July", "August", "September", "October", 
                        "November", "December" 
                     ];

export const sortBy = ( list, key ) => {
    const sorted = list.sort( ( { [key]: a }, { [key]: b } ) => {
        return a - b
    })

    return sorted;
}


export const formatPathName = ( path ) => {

       if ( path === '/' ) { 
           return "HomePage";
        }
       else if( path === '/tenant/new')  {
           return 'Create New Tenant';
        }
       else if ( /\/tenant\/[0-9]+/.test(path) ) {
           return (
              <> <p onClick={() => window.location.reload()} > Tenant Information</p></>
           );
       }
  
}