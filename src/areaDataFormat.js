/**
 * @author rubyisapm
 */
/**
 * 该地区常量AREA为内部地区源数据，请直接从script引入该全局变量
 */
define({
    /**
     * 检测当前的地区类型
     * @param nameOrId 地区ID[组]或者名称[组]
     * @returns {String} 'province' | 'city' | 'region' | 'other'
     */
    areaType: function (nameOrId) {
        var that = this;
        var isId = /^\d+$/.test(nameOrId);
        if (isId) {
            nameOrId = that.getSimplifiedCode(nameOrId);
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
            cityId = cityName !== '' ? AREA.city[provinceName].filter(function (item) {
                return item.Name === cityName;
            })[0].ID : '',
            regionId = regionName !== '' ? AREA.region[cityName].filter(function (item) {
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
        var that=this;
        id = that.getSimplifiedCode(id);
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
    },
    /**
     * 获取简化版的地区code,如010100转化为0101
     * @param code {*}
     * @returns {*}
     */
    getSimplifiedCode: function(code){
        if(code * 1 % 10000 === 0){
            code = code.substr(0, 2);
        }else if(code * 1 % 100 === 0){
            code = code.substr(0, 4);
        }
        return code;
    },
    /**
     * 根据地区code列表获取符合(不符合)该列表的源地区数据，和项目中的定向/屏蔽对应
     * @param codeList 地区编码列表
     * @param belong 是属于（定向）还是不属于(屏蔽)
     * @returns {{province: Array, city: {}, region: {}}}
     */
    filterByCode(codeList, belong){
        var that = this;
        //以下均为code集合
        var originalProvinceList = [];
        var originalCityList = [];
        var originalRegionList = [];
        var result = {
            province: [],
            city: {},
            region: {}
        };
        if(typeof belong === 'undefined'){
            belong = true;
        }

        // 是否为符合条件的province
        var isValidProvince = function(provinceCode, belong){
            var isInOriginalProvinceList = originalProvinceList.indexOf(provinceCode) > -1;
            var hasCityInOriginalCityList = originalCityList.filter(function(cityCode){
                return provinceCode === cityCode.substr(0, 2);
            }).length > 0;
            var hasRegionInOriginalRegionList = originalRegionList.filter(function(regionCode){
                return provinceCode === regionCode.substr(0, 2);
            }).length > 0;

            if(belong){
                return isInOriginalProvinceList || hasCityInOriginalCityList || hasRegionInOriginalRegionList;
            }
            return !isInOriginalProvinceList;
        };
        // 是否为符合条件的city
        var isValidCity = function(cityCode, belong){
            var isInOriginalCityList = originalCityList.indexOf(cityCode) > -1;

            var isProvinceInOriginalProvinceList = originalProvinceList.filter(function(provinceCode){
                return provinceCode === cityCode.substr(0, 2);
            }).length > 0;

            var hasRegionInOriginalRegionList = originalRegionList.filter(function(regionCode){
                return cityCode === regionCode.substr(0, 4);
            }).length > 0;

            if(belong){
                return isInOriginalCityList || isProvinceInOriginalProvinceList || hasRegionInOriginalRegionList;
            }
            return !isInOriginalCityList && !isProvinceInOriginalProvinceList;
        };
        // 是否为符合条件的region
        var isValidRegion = function(regionCode, belong){
            var isProvinceInOriginalProvinceList = originalProvinceList.filter(function(provinceCode){
                return regionCode.substr(0, 2) === provinceCode;
            }).length > 0;
            var isCityInOriginalCityList = originalCityList.filter(function(cityCode){
                return regionCode.substr(0, 4) === cityCode;
            }).length > 0;
            var isInOriginalRegionList = originalRegionList.indexOf(regionCode) > -1;

            if(belong){
                return isProvinceInOriginalProvinceList || isCityInOriginalCityList || isInOriginalRegionList;
            }
            return !isProvinceInOriginalProvinceList && !isCityInOriginalCityList && ! isInOriginalRegionList;
        };

        //解析地区列表，总结出省市区列表，以便后续的符合性检测
        codeList.map(function(code){
            code = that.getSimplifiedCode(code);
            var areaType = that.areaType(code);

            if (areaType === 'province'){
                originalProvinceList.push(code);
            } else if(areaType === 'city'){
                originalCityList.push(code);
            } else if(areaType === 'region'){
                originalRegionList.push(code);
            }
        });

        //从AREA中筛选符合条件地区并更新到result
        result.province = AREA.province.filter(function(province){
            return isValidProvince(province.ID, belong);
        });
        for (var provinceKey in AREA.city){
            if(AREA.city.hasOwnProperty(provinceKey)){
                var cities = AREA.city[provinceKey];
                result.city[provinceKey] = cities.filter(function(city){
                    return isValidCity(city.ID, belong);
                })
            }
        }
        for(var cityKey in AREA.region){
            if(AREA.region.hasOwnProperty(cityKey)){
                var regions = AREA.region[cityKey];

                result.region[cityKey] = regions.filter(function(region){
                    return isValidRegion(region.ID, belong);
                })
            }
        }
        return result;
    },
    /**
     * 根据地区名称列表获取符合条件的地区源数据
     * @param nameList 地区列表 分隔符为非中文即可
     * @param belong 是属于（定向）还是不属于(屏蔽)
     * @returns {*|{province: Array, city: {}, region: {}}}
     */
    filterByName(nameList, belong){
        var that = this;
        var codeList = nameList.map(function(item){
            return that.getAreaIdByName(item);
        });

        if(typeof belong === 'undefined'){
            belong = true;
        }
        return that.filterByCode(codeList, belong);
    }
});



