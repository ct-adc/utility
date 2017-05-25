/**
 * @author rubyisapm
 */
/**
 * 该地区常量AREA为内部地区源数据，请直接从script引入该全局变量
 */
define({
    /**
     * 检测当前的地区类似
     * @param nameOrId 地区ID[组]或者名称[组]
     * @returns {String} 'province' | 'city' | 'region' | 'other'
     */
    areaType: function (nameOrId) {
        var isId = /^\d+$/.test(nameOrId);
        if (isId) {
            if (nameOrId.length === 2) {
                return 'province';
            } else if (nameOrId.length === 4) {
                return 'city';
            } else if (nameOrId.length === 6) {
                return 'region';
            }
        } else {
            var areaArr = nameOrId.split(/[^\u4e00-\u9fa5]+/);
            if (areaArr.length === 1) {
                return 'province';
            } else if (areaArr.length === 2) {
                return 'city';
            } else if (areaArr.length === 3) {
                return 'region';
            }
        }
        return 'other';
    },
    /**
     * 根据地区名称组获取对应的id组 如'浙江-杭州'转换为0601
     * @param {String} name 地区名称如'浙江'(或名称组如'浙江-杭州')
     * @returns {String}
     */
    getAreaIdByName: function (name) {
        name = name.split(/[^\u4e00-\u9fa5]+/);
        var provinceName = name[0],
            cityName = name.length > 1 ? name[1] : '',
            regionName = name.length > 2 ? name[2] : '',
            provinceId = AREA.province.filter(function (item) {
                return item.Name === provinceName;
            })[0].ID,
            cityId = cityName != '' ? AREA.city[provinceName].filter(function (item) {
                return item.Name === cityName;
            })[0].ID : '',
            regionId = regionName != '' ? AREA.region[cityName].filter(function (item) {
                return item.Name === regionName;
            })[0].ID : '';

        return [provinceId, cityId, regionId][name.length - 1];
    },
    /**
     * 根据Id组获取地区组名称 如0601转换为'浙江-杭州'
     * @param {String} id 地区ID如'06'（或ID组如'0601'）
     * @param {String} [sep='-'] 分隔符
     * @returns {String}
     */
    getAreaNameById: function (id, sep) {
        sep = sep || '-';
        var provinceId = id.substr(0, 2),
            cityId = id.length > 2 ? id.substr(0, 4) : '',
            regionId = id.length > 4 ? id.substr(0, 6) : '',
            provinceName = provinceId !== '' ? AREA.province.filter(function(item) {
                return item.ID === provinceId;
            })[0].Name : '',
            cityName = cityId !== '' ? AREA.city[provinceName].filter(function(item) {
                return item.ID === cityId;
            })[0].Name : '',
            regionName = regionId !== '' ? AREA.region[cityName].filter(function(item) {
                return item.ID === regionId;
            })[0].Name : '';

        if (id.length === 2) {
            return provinceName;
        } else if (id.length === 4) {
            return provinceName + sep + cityName;
        } else if (id.length == 6) {
            return provinceName + sep + cityName + sep + regionName;
        }
    },
    /**
     * 获取具体province下的city
     * @param {String} provinceName province名称
     * @return {Array} province名称下的所有city组成的数组，其中每项是一个对象，包含单一city的ID和Name
     */
    getCitiesOfProvinceName: function (provinceName) {
        var cities = AREA.city[provinceName],
            citiesData = [];
        if (typeof cities !== 'undefined') {
            for (var c in cities) {
                if (cities.hasOwnProperty(c)) {
                    citiesData.push(cities[c]);
                }
            }
        }
        return citiesData;
    },
    /**
     * 获取具体city下的region
     * @param {String} cityName city名称
     * @return {Array} city名称下的所有region组成的数组，其中每项是一个对象，包含单一region的ID和Name
     */
    getRegionsOfCityName: function (cityName) {
        var regions = AREA.region[cityName],
            regionsData = [];
        if (typeof regions !== 'undefined') {
            for (var r in regions) {
                if (regions.hasOwnProperty(r)) {
                    regionsData.push(regions[r]);
                }
            }
        }
        return regionsData;
    },
    /**
     * 将扁平的数据结构变成树状结构
     * @param {String} [childrenKey='children'] 表示层级的key名称
     * @returns {Array}
     */
    areaTransfer: function (childrenKey) {
        childrenKey = childrenKey || 'children';
        var provincesData = AREA.province,
            that = this;

        provincesData.map(function (province) {
            var provinceName = province.Name,
                citiesData = that.getCitiesOfProvinceName(provinceName);
            province[childrenKey] = citiesData;
            citiesData.map(function (city) {
                city[childrenKey] = that.getRegionsOfCityName(city.Name);
            })
        });
        return provincesData;
    }
});



