const chrono = require('chrono-node');

var TimezoneAbbrRefiner = new chrono.Refiner();

TimezoneAbbrRefiner.refine = function(text, results) {

  let timezoneAbbrRegex = new RegExp("ACDT|ACST|ADT|AEDT|AEST|AFT|AKDT|AKST|ALMT|AMST|AMT|ANAST|ANAT|AQTT|ART|AST|AWDT|AWST|AZOST|AZOT|AZST|AZT|BNT|BOT|BRST|BRT|BST|BTT|CAST|CAT|CCT|CDT|CEST|CET|CHADT|CHAST|CKT|CLST|CLT|COT|CST|CVT|CXT|ChST|DAVT|EASST|EAST|EAT|ECT|EDT|EEST|EET|EGST|EGT|EST|ET|FJST|FJT|FKST|FKT|FNT|GALT|GAMT|GET|GFT|GILT|GMT|GST|GYT|HAA|HAC|HADT|HAE|HAP|HAR|HAST|HAT|HAY|HKT|HLV|HNA|HNC|HNE|HNP|HNR|HNT|HNY|HOVT|ICT|IDT|IOT|IRDT|IRKST|IRKT|IRST|IST|JST|KGT|KRAST|KRAT|KST|KUYT|LHDT|LHST|LINT|MAGST|MAGT|MART|MAWT|MDT|MESZ|MEZ|MHT|MMT|MSD|MSK|MST|MUT|MVT|MYT|NCT|NDT|NFT|NOVST|NOVT|NPT|NST|NUT|NZDT|NZST|OMSST|OMST|PDT|PET|PETST|PETT|PGT|PHOT|PHT|PKT|PMDT|PMST|PONT|PST|PT|PWT|PYST|PYT|RET|SAMT|SAST|SBT|SCT|SGT|SRT|SST|TAHT|TFT|TJT|TKT|TLT|TMT|TVT|ULAT|UTC|UYST|UYT|UZT|VET|VLAST|VLAT|VUT|WAST|WAT|WEST|WESZ|WET|WEZ|WFT|WGST|WGT|WIB|WIT|WITA|WST|WT|YAKST|YAKT|YAPT|YEKST|YEKT", "i");

  let abbrMap = {
    'AEDT' : 'Australia/Melbourne',
    'AEST' : 'Australia/Melbourne',
    'JST'  : 'Asia/Tokyo',
  };

  results.forEach(function(result) {
    let match;
    if ((match = timezoneAbbrRegex.exec(text)) !== null) {
      let timezoneAbbr = match[0];
      result.start.assign('timezoneAbbr', timezoneAbbr);
      let timezone = abbrMap[timezoneAbbr];
      if (timezone) {
        result.start.assign('timezone', timezone);
      }
    }
  });

  return results;
}

module.exports = TimezoneAbbrRefiner;
