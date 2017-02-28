/**
 * @author rubyisapm
 */
function getAreaIdByName(name) {
    name = name.split('-');
    var provinceName = name[0],
        cityName = name.length > 1 ? name[1] : '',
        regionName = name.length > 2 ? name[2] : '';
    var provinceId = AREA.province.filter(function (item) {
            return item.Name === provinceName;
        })[0].ID;
    var cityId = cityName != '' ? AREA.city[provinceName].filter(function (item) {
        return item.Name === cityName;
    })[0].ID : '';
    var regionId = regionName != '' ? AREA.region[cityName].filter(function (item) {
        return item.Name === regionName;
    })[0].ID : '';

    return [provinceId, cityId, regionId][name.length - 1];
}


function areaTransfer() {
    var data = [];
    for (var p in AREA.province) {
        var provinceData = {};
        var provinceName = AREA.province[p].Name;
        provinceData.id = AREA.province[p].ID;
        provinceData.label = provinceName;
        var cities = AREA.city[provinceName];
        if (typeof cities !== 'undefined') {
            provinceData.children = [];
            for (var c in cities) {
                var cityData = {};
                var cityName = cities[c].Name;
                cityData.id = cities[c].ID;
                cityData.label = cityName;
                var regions = AREA.region[cityName];
                if (typeof regions !== 'undefined') {
                    cityData.children = [];
                }
                provinceData.children.push(cityData);
                for (var r in regions) {
                    var regionData = {};
                    var regionName = regions[r].Name;
                    regionData.id = regions[r].ID;
                    regionData.label = regionName;
                    cityData.children.push(regionData);
                }
            }
        }
        data.push(provinceData);
    }
    return data;
}

