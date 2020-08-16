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

export const isNumber = ( elem ) => {
    return typeof elem === 'number';
}

export const takeBalanceOwed = ( totalPayed, totalDue ) => {
    return totalPayed - totalDue;
}

