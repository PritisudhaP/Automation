(function() {
    angular.module('app').factory('$apiCategory', ['$enApi','$uuid','$rootScope', function ($enApi, $uuid, $rootScope) {
    var self                    = this;
    var _baseURL                = '/api/v1/skuGroup';

    this.structure = function(){
        return {
            title       : '',
            refName     : $uuid.new('-'),
            description : '',
            skuAttributeSetDefinitionReferences:[],
            locked      : false,
            parentReference : {
                refName     : '',
                dataDomain  : ''
            }
        };
    };

    var url = {
        listMain    : 'skuGroup/objectRef/parentReference/null/null',
        listSubs    : 'skuGroup/objectRef/parentReference/{{dataDomain}}/{{refName}}',
        createMain  : 'skuGroup', //dont send any id or dataDomain info
        createSub   : 'skuGroup',
        // Same as createMain only add the parentReference to the request obj
        //            "parentReference" : {
        //                "refName" : "Test_Category_1",
        //                "dataDomain" : "com.nassuacandy",
        //            }
        edit        : 'skuGroup' //just add in ID.  This is a "PUT"
    };

    this.treeModel          = [];
    this.selectedCategory   = null;
    this.selected           = '';

    this.getTree = function(selectedNode){

        return $enApi.object({
                name:'skuGroupTree',
                method:'get',
                trigger: false,
                path: '/api/v1/skuGroup/tree'
            })
            .get()
            .then(function(data) {
                self.selected = selectedNode || '';
                self.treeModel = data;
                $rootScope.$broadcast("catTreeModelUpdate");
            });
    };

    this.selectCategory = function(obj){
        self.selectedCategory = obj;
        $rootScope.$broadcast("catSelectionUpdate");
    };



    this.list = function (params) {

        return $enApi.object({
                name:'skuGroupList',
                method:'list',
                trigger: false,
                path:_baseURL
            });
    };

    this.get = function (id, params) {
        return $enApi.object({
            name:'skuGroupGet',
            method:'get',
            trigger: false,
            path:_baseURL + '/'+id
        });
    };

    this.getWithInherited = function (id, params) {

        return $enApi.object({
            name:'getwithInheritedAttrs',
            method:'get',
            trigger: false,
            path:_baseURL + '/withInherited/' + id
        }).get();


        //return $api.getObject(_baseURL+'/withInherited', id, params);
    };

//   /attributeSetDefinition/id/UUID
    this.getDefinitions = function(refName, dataDomain, params){ //params:ARRAY

        return $enApi.object({
            name:'attributeSetDefinition',
            method:'list',
            trigger: false,
            path:'attributeDefinition/objectRef/attributeSetDefinitionReferences/'+dataDomain+'/'+refName
        });
    };

    this.update = function (id, obj, qs, headers) {

        console.log("id",id);
        console.log("obj", obj)
        delete obj.isSelected;

        return $enApi.object({
            name:'updateCat',
            method:'get',
            trigger: false,
            data:obj,
            path:_baseURL + '/id/' + id
        }).put();

       // return $api.put([_baseURL,'id',id], obj, qs);
    };

    this.save = function (obj, qs, headers) {


        return $enApi.object({
            name:'skuGroup',
            method:'post',
            trigger: false,
            data:obj,
            path:_baseURL
        });
    };





    this.attrSetDefs = [
        {description: "Allergens",              refName: "allergens",           id: "4e893d47-86a0-458c-b76b-15e298d8b745"},
        {description: "Edibles",                refName: "edibles",             id: "4e893d47-86a0-458c-b76b-15e298d8b745"},
        {description: "Universal Item Data",    refName: "universal_item_data", id: "4e893d47-86a0-458c-b76b-15e298d8b745"}
    ];

    this.fakeUUID = '778uu-229eooa-skj23j';
    this.fakeUUIDCnt = 89;

    this.fakeCatTree = [

        {cat: {title: 'Cat 1', dataDomain:'com.nassau', refName:'cat1', description:'My awesome description.', description:'My awesome description.', id:'778uu-229eooa-skj23j1'},
            subcats:[
                {cat: {title:'Sub 1-1', dataDomain:'com.nassau', refName:'sub1_1', description:'My awesome description.', id:'778uu-229eooa-skj23j2'}, subcats:[]},
                {cat: {title:'Sub 1-2', dataDomain:'com.nassau', refName:'sub1_2', description:'My awesome description.', id:'778uu-229eooa-skj23j3'}, subcats:[
                    {cat: {title:'Sub 1-2a', dataDomain:'com.nassau', refName:'sub1_2a', description:'My awesome description.', id:'778uu-229eooa-skj23j4'}, subcats:[]},
                    {cat: {title:'Sub 1-2b', dataDomain:'com.nassau', refName:'sub1_2b', description:'My awesome description.', id:'778uu-229eooa-skj23j5'}, subcats:[
                        {cat: {title:'Sub 1-2b1', dataDomain:'com.nassau', refName:'sub1_2b1', description:'My awesome description.', id:'778uu-229eooa-skj23j6'}, subcats:[]},
                        {cat: {title:'Sub 1-2b2', dataDomain:'com.nassau', refName:'sub1_2b2', description:'My awesome description.', id:'778uu-229eooa-skj23j7'}, subcats:[]}
                    ]}
                ]}
            ]
        },


        {cat: {title: 'Cat 2', dataDomain:'com.nassau', refName:'cat2', description:'My awesome description.', id:'778uu-229eooa-skj23j8'},
            subcats:[
                {cat: {title:'Sub 2-1', dataDomain:'com.nassau', refName:'sub2_1', description:'My awesome description.', id:'778uu-229eooa-skj23j9'}, subcats:[]},
                {cat: {title:'Sub 2-2', dataDomain:'com.nassau', refName:'sub2_2', description:'My awesome description.', id:'778uu-229eooa-skj23j10'}, subcats:[
                    {cat: {title:'Sub 2-2a', dataDomain:'com.nassau', refName:'sub2_2a', description:'My awesome description.', id:'778uu-229eooa-skj23j11'}, subcats:[]},
                    {cat: {title:'Sub 2-2b', dataDomain:'com.nassau', refName:'sub2_2b', description:'My awesome description.', id:'778uu-229eooa-skj23j12'}, subcats:[
                        {cat: {title:'Sub 2-2b1', dataDomain:'com.nassau', refName:'sub2_2b1', description:'My awesome description.', id:'778uu-229eooa-skj23j13'}, subcats:[]},
                        {cat: {title:'Sub 2-2b2', dataDomain:'com.nassau', refName:'sub2_2b2', description:'My awesome description.', id:'778uu-229eooa-skj23j14'}, subcats:[]}
                    ]}
                ]}
            ]
        },
        {cat: {title: 'Cat 3', dataDomain:'com.nassau', refName:'cat3', description:'My awesome description.', id:'778uu-229eooa-skj23j15'},
            subcats:[
                {cat: {title:'Sub 3-1', dataDomain:'com.nassau', refName:'sub3_1', description:'My awesome description.', id:'778uu-229eooa-skj23j16'}, subcats:[]},
                {cat: {title:'Sub 3-2', dataDomain:'com.nassau', refName:'sub3_2', description:'My awesome description.', id:'778uu-229eooa-skj23j17'}, subcats:[
                    {cat: {title:'Sub 3-2a', dataDomain:'com.nassau', refName:'sub3_2a', description:'My awesome description.', id:'778uu-229eooa-skj23j18'}, subcats:[]},
                    {cat: {title:'Sub 3-2b', dataDomain:'com.nassau', refName:'sub3_2b', description:'My awesome description.', id:'778uu-229eooa-skj23j19'}, subcats:[
                        {cat: {title:'Sub 3-2b1', dataDomain:'com.nassau', refName:'sub3_2b1', description:'My awesome description.', id:'778uu-229eooa-skj23j20'}, subcats:[]},
                        {cat: {title:'Sub 3-2b2', dataDomain:'com.nassau', refName:'sub3_2b2', description:'My awesome description.', id:'778uu-229eooa-skj23j21'}, subcats:[]}
                    ]},
                    {cat: {title:'Sub 3-2c', dataDomain:'com.nassau', refName:'sub3_2c', description:'My awesome description.', id:'778uu-229eooa-skj23j22'}, subcats:[]},
                    {cat: {title:'Sub 3-2d', dataDomain:'com.nassau', refName:'sub3_2d', description:'My awesome description.', id:'778uu-229eooa-skj23j23'}, subcats:[
                        {cat: {title:'Sub 3-2d1', dataDomain:'com.nassau', refName:'sub3_2d1', description:'My awesome description.', id:'778uu-229eooa-skj23j24'}, subcats:[]},
                        {cat: {title:'Sub 3-2d2', dataDomain:'com.nassau', refName:'sub3_2d2', description:'My awesome description.', id:'778uu-229eooa-skj23j25'}, subcats:[]},
                        {cat: {title:'Sub 3-2d3', dataDomain:'com.nassau', refName:'sub3_2d3', description:'My awesome description.', id:'778uu-229eooa-skj23j26'}, subcats:[
                            {cat: {title:'Sub 3-2d3a', dataDomain:'com.nassau', refName:'sub3_2d3a', description:'My awesome description.', id:'778uu-229eooa-skj23j27'}, subcats:[]},
                            {cat: {title:'Sub 3-2d3b', dataDomain:'com.nassau', refName:'sub3_2d3b', description:'My awesome description.', id:'778uu-229eooa-skj23j28'}, subcats:[]},
                            {cat: {title:'Sub 3-2d3c', dataDomain:'com.nassau', refName:'sub3_2d3c', description:'My awesome description.', id:'778uu-229eooa-skj23j29'}, subcats:[]},
                            {cat: {title:'Sub 3-2d3d', dataDomain:'com.nassau', refName:'sub3_2d3d', description:'My awesome description.', id:'778uu-229eooa-skj23j30'}, subcats:[]},
                            {cat: {title:'Sub 3-2d3e', dataDomain:'com.nassau', refName:'sub3_2d3e', description:'My awesome description.', id:'778uu-229eooa-skj23j31'}, subcats:[]},
                            {cat: {title:'Sub 3-2d3f', dataDomain:'com.nassau', refName:'sub3_2d3f', description:'My awesome description.', id:'778uu-229eooa-skj23j32'}, subcats:[]},
                            {cat: {title:'Sub 3-2d3g', dataDomain:'com.nassau', refName:'sub3_2d3g', description:'My awesome description.', id:'778uu-229eooa-skj23j33'}, subcats:[]},
                        ]},
                        {cat: {title:'Sub 3-2d4', dataDomain:'com.nassau', refName:'sub3_2d4', description:'My awesome description.', id:'778uu-229eooa-skj23j34'}, subcats:[]},
                        {cat: {title:'Sub 3-2d5', dataDomain:'com.nassau', refName:'sub3_2d5', description:'My awesome description.', id:'778uu-229eooa-skj23j35'}, subcats:[]},
                        {cat: {title:'Sub 3-2d6', dataDomain:'com.nassau', refName:'sub3_2d6', description:'My awesome description.', id:'778uu-229eooa-skj23j36'}, subcats:[]},
                        {cat: {title:'Sub 3-2d7', dataDomain:'com.nassau', refName:'sub3_2d7', description:'My awesome description.', id:'778uu-229eooa-skj23j37'}, subcats:[]},
                        {cat: {title:'Sub 3-2d8', dataDomain:'com.nassau', refName:'sub3_2d8', description:'My awesome description.', id:'778uu-229eooa-skj23j38'}, subcats:[]}
                    ]},
                    {cat: {title:'Sub 3-2e', dataDomain:'com.nassau', refName:'sub3_2e', description:'My awesome description.', id:'778uu-229eooa-skj23j39'}, subcats:[]},
                    {cat: {title:'Sub 3-2f', dataDomain:'com.nassau', refName:'sub3_2f', description:'My awesome description.', id:'778uu-229eooa-skj23j40'}, subcats:[]},
                    {cat: {title:'Sub 3-2g', dataDomain:'com.nassau', refName:'sub3_2g', description:'My awesome description.', id:'778uu-229eooa-skj23j41'}, subcats:[]},
                    {cat: {title:'Sub 3-2h', dataDomain:'com.nassau', refName:'sub3_2h', description:'My awesome description.', id:'778uu-229eooa-skj23j42'}, subcats:[]},
                ]}
            ]
        },
        {cat: {title: 'Cat 4', dataDomain:'com.nassau', refName:'cat4', description:'My awesome description.', id:'778uu-229eooa-skj23j43'},
            subcats:[
                {cat: {title:'Sub 4-1', dataDomain:'com.nassau', refName:'sub4_1', description:'My awesome description.', id:'778uu-229eooa-skj23j44'}, subcats:[]},
                {cat: {title:'Sub 4-2', dataDomain:'com.nassau', refName:'sub4_2', description:'My awesome description.', id:'778uu-229eooa-skj23j45'}, subcats:[
                    {cat: {title:'Sub 4-2a', dataDomain:'com.nassau', refName:'sub4_2a', description:'My awesome description.', id:'778uu-229eooa-skj23j46'}, subcats:[]},
                    {cat: {title:'Sub 4-2b', dataDomain:'com.nassau', refName:'sub4_2b', description:'My awesome description.', id:'778uu-229eooa-skj23j47'}, subcats:[
                        {cat: {title:'Sub 4-2b1', dataDomain:'com.nassau', refName:'sub4_2b1', description:'My awesome description.', id:'778uu-229eooa-skj23j48'}, subcats:[]},
                        {cat: {title:'Sub 4-2b2', dataDomain:'com.nassau', refName:'sub4_2b2', description:'My awesome description.', id:'778uu-229eooa-skj23j49'}, subcats:[]}
                    ]}
                ]}
            ]
        },
        {cat: {title: 'Cat 5', dataDomain:'com.nassau', refName:'cat5', description:'My awesome description.', id:'778uu-229eooa-skj23j50'},
            subcats:[
                {cat: {title:'Sub 5-1', dataDomain:'com.nassau', refName:'sub5_1', description:'My awesome description.', id:'778uu-229eooa-skj23j51'}, subcats:[]},
                {cat: {title:'Sub 5-2', dataDomain:'com.nassau', refName:'sub5_2', description:'My awesome description.', id:'778uu-229eooa-skj23j52'}, subcats:[
                    {cat: {title:'Sub 5-2a', dataDomain:'com.nassau', refName:'sub5_2a', description:'My awesome description.', id:'778uu-229eooa-skj23j53'}, subcats:[]},
                    {cat: {title:'Sub 5-2b', dataDomain:'com.nassau', refName:'sub5_2b', description:'My awesome description.', id:'778uu-229eooa-skj23j54'}, subcats:[
                        {cat: {title:'Sub 5-2b1', dataDomain:'com.nassau', refName:'sub5_2b1', description:'My awesome description.', id:'778uu-229eooa-skj23j55'}, subcats:[]},
                        {cat: {title:'Sub 5-2b2', dataDomain:'com.nassau', refName:'sub5_2b2', description:'My awesome description.', id:'778uu-229eooa-skj23j56'}, subcats:[]}
                    ]}
                ]}
            ]
        },
        {cat: {title: 'Cat 6', dataDomain:'com.nassau', refName:'cat6', description:'My awesome description.', id:'778uu-229eooa-skj23j57'},
            subcats:[
                {cat: {title:'Sub 6-1', dataDomain:'com.nassau', refName:'sub6_1', description:'My awesome description.', id:'778uu-229eooa-skj23j58'}, subcats:[]},
                {cat: {title:'Sub 6-2', dataDomain:'com.nassau', refName:'sub6_2', description:'My awesome description.', id:'778uu-229eooa-skj23j59'}, subcats:[
                    {cat: {title:'Sub 6-2a', dataDomain:'com.nassau', refName:'sub6_2a', description:'My awesome description.', id:'778uu-229eooa-skj23j60'}, subcats:[]},
                    {cat: {title:'Sub 6-2b', dataDomain:'com.nassau', refName:'sub6_2b', description:'My awesome description.', id:'778uu-229eooa-skj23j61'}, subcats:[
                        {cat: {title:'Sub 6-2b1', dataDomain:'com.nassau', refName:'sub6_2b1', description:'My awesome description.', id:'778uu-229eooa-skj23j62'}, subcats:[]},
                        {cat: {title:'Sub 6-2b2', dataDomain:'com.nassau', refName:'sub6_2b2', description:'My awesome description.', id:'778uu-229eooa-skj23j63'}, subcats:[]}
                    ]}
                ]}
            ]
        },
        {cat: {title: 'Cat 7', dataDomain:'com.nassau', refName:'cat7', description:'My awesome description.', id:'778uu-229eooa-skj23j64'},
            subcats:[
                {cat: {title:'Sub 7-1', dataDomain:'com.nassau', refName:'sub7_1', description:'My awesome description.', id:'778uu-229eooa-skj23j65'}, subcats:[]},
                {cat: {title:'Sub 7-2', dataDomain:'com.nassau', refName:'sub7_2', description:'My awesome description.', id:'778uu-229eooa-skj23j66'}, subcats:[
                    {cat: {title:'Sub 7-2a', dataDomain:'com.nassau', refName:'sub7_2a', description:'My awesome description.', id:'778uu-229eooa-skj23j67'}, subcats:[]},
                    {cat: {title:'Sub 7-2b', dataDomain:'com.nassau', refName:'sub7_2b', description:'My awesome description.', id:'778uu-229eooa-skj23j68'}, subcats:[
                        {cat: {title:'Sub 7-2b1', dataDomain:'com.nassau', refName:'sub7_2b1', description:'My awesome description.', id:'778uu-229eooa-skj23j69'}, subcats:[]},
                        {cat: {title:'Sub 7-2b2', dataDomain:'com.nassau', refName:'sub7_2b2', description:'My awesome description.', id:'778uu-229eooa-skj23j70'}, subcats:[]}
                    ]}
                ]}
            ]
        },
        {cat: {title: 'Cat 8', dataDomain:'com.nassau', refName:'cat8', description:'My awesome description.', id:'778uu-229eooa-skj23j71'},
            subcats:[
                {cat: {title:'Sub 8-1', dataDomain:'com.nassau', refName:'sub8_1', description:'My awesome description.', id:'778uu-229eooa-skj23j72'}, subcats:[]},
                {cat: {title:'Sub 8-2', dataDomain:'com.nassau', refName:'sub8_2', description:'My awesome description.', id:'778uu-229eooa-skj23j73'}, subcats:[
                    {cat: {title:'Sub 8-2a', dataDomain:'com.nassau', refName:'sub8_2a', description:'My awesome description.', id:'778uu-229eooa-skj23j74'}, subcats:[]},
                    {cat: {title:'Sub 8-2b', dataDomain:'com.nassau', refName:'sub8_2b', description:'My awesome description.', id:'778uu-229eooa-skj23j75'}, subcats:[
                        {cat: {title:'Sub 8-2b1', dataDomain:'com.nassau', refName:'sub8_2b1', description:'My awesome description.', id:'778uu-229eooa-skj23j76'}, subcats:[]},
                        {cat: {title:'Sub 8-2b2', dataDomain:'com.nassau', refName:'sub8_2b2', description:'My awesome description.', id:'778uu-229eooa-skj23j77'}, subcats:[]}
                    ]}
                ]}
            ]
        },
        {cat: {title: 'Cat 9', dataDomain:'com.nassau', refName:'cat9', description:'My awesome description.', id:'778uu-229eooa-skj23j78'},
            subcats:[
                {cat: {title:'Sub 9-1', dataDomain:'com.nassau', refName:'sub9_1', description:'My awesome description.', id:'778uu-229eooa-skj23j79'}, subcats:[]},
                {cat: {title:'Sub 9-2', dataDomain:'com.nassau', refName:'sub9_2', description:'My awesome description.', id:'778uu-229eooa-skj23j80'}, subcats:[
                    {cat: {title:'Sub 9-2a', dataDomain:'com.nassau', refName:'sub9_2a', description:'My awesome description.', id:'778uu-229eooa-skj23j81'}, subcats:[]},
                    {cat: {title:'Sub 9-2b', dataDomain:'com.nassau', refName:'sub9_2b', description:'My awesome description.', id:'778uu-229eooa-skj23j82'}, subcats:[
                        {cat: {title:'Sub 9-2b1', dataDomain:'com.nassau', refName:'sub9_2b1', description:'My awesome description.', id:'778uu-229eooa-skj23j83'}, subcats:[]},
                        {cat: {title:'Sub 9-2b2', dataDomain:'com.nassau', refName:'sub9_2b2', description:'My awesome description.', id:'778uu-229eooa-skj23j84'}, subcats:[]}
                    ]}
                ]}
            ]
        }
    ];

    return this;
}]);

})();
