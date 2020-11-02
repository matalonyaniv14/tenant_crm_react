import React from 'react';

export const MONTHS = [ 
    "January", "February", "March", "April", "May", 
     "June", "July", "August", "September", "October", 
     "November", "December" 
];

export const capitalize = ( s ) =>  s.charAt(0).toUpperCase() + s.slice(1)
export const formatIfNull = str  =>  str ?? 'Not Set';
export const addZero =  num  => num < 10 ? `0${num}` : num
export const isNumber =  elem  =>  typeof elem === 'number';
export const toCurrency = num  => num < 0 ? `-$${ Math.abs( num ) }` : `$${ num }` 
export const takeBalanceOwed = ( totalPayed, totalDue ) =>  totalPayed - totalDue;


export const formatKey = ( key ) => {
    return key.split( '_' )
        .map( str => capitalize( str ) )
        .join( ' ' );
}

export const formatDate = ( d ) => {
    let [month, day, year]  = ( new Date( d ) ).toLocaleDateString().split("/");

    return `${ MONTHS[month - 1] } ${ day }, ${ year }`
}

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
              <div>
                  <p onClick={() => window.location.reload()} > Tenant Information</p>
              </div>
           );
       }
  
}