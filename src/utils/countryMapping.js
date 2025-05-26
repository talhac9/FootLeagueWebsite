export const countryMapping = {
    'br BRA': 'Brazil',
    'eng ENG': 'England',
    'pt POR': 'Portugal',
    'fr FRA': 'France',
    'ch SUI': 'Switzerland',
    'de GER': 'Germany',
    'nl NED': 'Netherlands',
    'be BEL': 'Belgium',
    'it ITA': 'Italy',
    'at AUT': 'Austria',
    'no NOR': 'Norway',
    'se SWE': 'Sweden',
    'tr TUR': 'Turkey',
    'gr GRE': 'Greece',
    'ro ROM': 'Romania',
    'hu HUN': 'Hungary',
    'cz CZE': 'Czech Republic',
    'gh GHA': 'Ghana',
    'ua UKR': 'Ukraine',
    'jp JPN': 'Japan',
    'sc SCO': 'Scotland',
    'eg EGY': 'Egypt',
    'ee EST': 'Estonia',
    'es ESP': 'Spain',
    'ar ARG': 'Argentina',
    'dk DEN': 'Denmark',
    'py PAR': 'Paraguay',
    'co COL': 'Colombia',
    'hr CRO': 'Croatia',
    'uy URU': 'Uruguay',
    'kr KOR': 'South Korea',
    'ml MLI': 'Mali',
    'ie IRL': 'Ireland',
    'nir NIR': 'Northern Ireland',
    'sk SVK': 'Slovakia',
    'dz ALG': 'Algeria',
    'gn GUI': 'Guinea',
    'ec ECU': 'Ecuador',
    'zm ZAM': 'Zambia',
    'nz NZL': 'New Zealand',
    'wls WAL': 'Wales',
    'ci CIV': 'Ivory Coast',
    'us USA': 'United States',
    'cm CMR': 'Cameroon',
    'sn SEN': 'Senegal',
    'iq IRQ': 'Iraq',
    'sct SCO': 'Scotland',
    'ga GAB': 'Gabon',
    'al ALB': 'Albania',
    'ma MAR': 'Morocco',
    'jm JAM': 'Jamaica',
    'rs SRB': 'Serbia',
    'rs BIH': 'Bosnia and Herzegovina',
    'rs MKD': 'North Macedonia',
    'rs CRO': 'Croatia',
    'cd COD': 'Democratic Republic of the Congo',
    'il ISR': 'Israel',
    'fi FIN': 'Finland',
    'ir IRN': 'Iran',
    'ng NGA': 'Nigeria',
    'ng CIV': 'Ivory Coast',
    'ng GHA': 'Ghana',
    'ng TUN': 'Tunisia',
    'ng ALG': 'Algeria',
    'ng BUR': 'Burkina Faso',
    'gd GRN': 'Grenada',
    'pl POL': 'Poland',
    'zw ZIM': 'Zimbabwe',
    'lr LBR': 'Liberia',
    've VEN': 'Venezuela',
    'ba BAN': 'Bangladesh',
    'ba BIH': 'Bosnia',
    'ms MSR': 'Montserrat',
    'tn TUN': 'Tunisia',
    'mx MEX': 'Mexico',
    'me MNE': 'Montenegro',
    'au AUS': 'Australia',
    'gb SCO': 'Scotland',
};

export const getFullCountryName = (countryCode) => {
    if (!countryCode) return '';
    
    // Try exact match first
    if (countryMapping[countryCode]) {
        return countryMapping[countryCode];
    }
    
    // If no exact match, try to find a match ignoring case
    const lowerCountryCode = countryCode.toLowerCase();
    const matchingKey = Object.keys(countryMapping).find(key => key.toLowerCase() === lowerCountryCode);
    if (matchingKey) {
        return countryMapping[matchingKey];
    }
    
    // If still no match, return the original code
    return countryCode;
}; 