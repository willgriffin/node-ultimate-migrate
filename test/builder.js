global.dryRun = true;

var Builder = require( '../lib/builder.js' ),
    Code = require( 'code' ),
    Lab = require( 'lab' ),
    lab = exports.lab = Lab.script();

log.silence( true );

var internals = {


    template:
    {
        _table:
        {},
        _columns:
        {},
        _changeKeys:
        {},
        _keys:
        {},
        _engine:
        {},

        table: function ( table, columns, drop )
        {

            if ( !this._table.table )
                this._table.table = [];

            if ( !this._table.columns )
                this._table.columns = [];

            this._table.table.push( table );
            this._table.columns.push( columns );

            return 'var test = test;'; //return to activate write function
        },

        columns: function ( table, columns, drop )
        {

            if ( !this._columns.table )
                this._columns.table = [];

            if ( !this._columns.columns )
                this._columns.columns = [];

            this._columns.table.push( table );
            this._columns.columns.push( columns );
        },

        changeKeys: function ( table, keys, drop, index )
        {

            if ( !this._changeKeys.table )
                this._changeKeys.table = [];

            if ( !this._changeKeys.keys )
                this._changeKeys.keys = [];

            this._changeKeys.table.push( table );
            this._changeKeys.keys.push( keys );
        },

        keys: function ( table, keys, drop, index )
        {

            if ( !this._keys.table )
                this._keys.table = [];

            if ( !this._keys.keys )
                this._keys.keys = [];

            this._keys.table.push( table );
            this._keys.keys.push( keys );
        },

        engine: function ( table, engines, drop )
        {

            if ( !this._engine.table )
                this._engine.table = [];

            if ( !this._engine.engines )
                this._engine.engines = [];

            this._engine.table.push( table );
            this._engine.engines.push( engines );
        }
    },

    driver:
    {

        capabilities: [
            'tables', 'views', 'engines', 'indizies',
            'columns'
        ],

        getTables: function ( config, callback )
        {
            callback( [
                [
                    [ 'atew', 'definetly', 'deleted', 'test' ],
                    [ 'tew' ]
                ],
                [
                    [ 'atew', 'definetly', 'test', 'test2' ],
                    [ 'tew' ]
                ]
            ] );
        },

        getColumns: function ( config, tables, context, callback )
        {
            var data = [];

            data[ 0 ] = [];
            data[ 1 ] = [];

            data[ 0 ].atew = [
                [ 'te', [ 'double', '11,3', 'unsigned' ],
                    false,
                    '0.000',
                    false,
                    ''
                ],
                [ 'lol', [ 'varchar', '255', 0 ], true, null, false, '' ],
                [ 'id', [ 'int', '10', 'unsigned' ], false, null, false, '' ],
                [ 'lol__id', [ 'int', '11', 0 ], false, null, false, '' ],
                [ 'test', [ 'timestamp', 0, 0 ], true, null, false, '' ],
                [ 'twocolumns', [ 'int', '11', 0 ], false, null, true, '' ],
                [ 'deleted', [ 'int', '11', 0 ], false, null, true, '' ]
            ];

            data[ 0 ].definetly = [
                [ 'lolwtf', [ 'int', '9', 0 ], true, null, false, '' ]
            ];

            data[ 0 ].test = [
                [ 'cdid', [ 'int', '10', 'unsigned' ], false, null, true, '' ],
                [ 'test', [ 'varchar', '255', 0 ], true, null, false, '' ],
                [ 'rofl_id', [ 'int', '11', 0 ], false, null, false, '' ]
            ];

            data[ 0 ].deleted = [
                [ 'id', [ 'int', '10', 'unsigned' ], false, null, false, '' ]
            ];

            data[ 1 ].atew = [
                [ 'te', [ 'double', '11,3', 'unsigned' ],
                    false,
                    '0.000',
                    false,
                    ''
                ],
                [ 'lol', [ 'varchar', '255', 0 ], true, null, false, '' ],
                [ 'id', [ 'int', '10', 'unsigned' ], false, null, false, '' ],
                [ 'lol__id', [ 'int', '11', 0 ], false, null, false, '' ],
                [ 'test', [ 'timestamp', 0, 0 ],
                    false,
                    'CURRENT_TIMESTAMP',
                    false,
                    'OUCT'
                ],
                [ 'twocolumns', [ 'int', '11', 0 ], false, null, true, '' ]
            ];

            data[ 1 ].definetly = [
                [ 'lolwtf', [ 'int', '9', 0 ], true, null, false, '' ]
            ];

            data[ 1 ].test = [
                [ 'cdid', [ 'int', '10', 'unsigned' ], false, null, true, '' ],
                [ 'test', [ 'varchar', '255', 0 ], true, null, false, '' ],
                [ 'rofl_id', [ 'int', '11', 0 ], false, null, false, '' ],
                [ 'deleted', [ 'int', '11', 0 ], false, null, false, '' ]
            ];

            data[ 1 ].test2 = [
                [ 'id', [ 'int', '10', 'unsigned' ], false, null, false, '' ]
            ];


            callback( context, data );
        },

        getFn: function ( config, callback ) {},

        getEngine: function ( config, context, callback )
        {

            var data = [
                [
                    [ 'atew', 'InnoDB' ],
                    [ 'definetly', 'InnoDB' ],
                    [ 'deleted', 'Memory' ],
                    [ 'test', 'InnoDB' ],
                    [ 'tew', null ]
                ],
                [
                    [ 'atew', 'Aria' ],
                    [ 'definetly', 'InnoDB' ],
                    [ 'test', 'InnoDB' ],
                    [ 'tew', null ]
                ]
            ];

            callback( context, data );
        },

        getIndizies: function ( config, tables, context, callback )
        {
            var data = [];
            data[ 0 ] = [];
            data[ 1 ] = [];


            data[ 0 ].atew = [
                [ 'PRIMARY', true, '1', 'twocolumns', false, 'BTREE', '', '' ],
                [ 'fktotest', true, '1', 'id', false, 'BTREE', '', '' ],
                [ 'fktotest', true, '2', 'lol__id', false, 'BTREE', '', '' ],
                [ 'ter', true, '1', 'te', false, 'BTREE', '', '' ],
                [ 'ter', true, '2', 'lol', true, 'BTREE', '', '' ],
                [ 'hthes', false, '1', 'te', false, 'BTREE', '', '' ],
                [ 'roflxD', false, '1', 'lol', true, 'BTREE', '', '' ]
            ];

            data[ 0 ].deleted = [
                [ 'PRIMARY', true, '1', 'id', false, 'BTREE', '', '' ]
            ];

            data[ 0 ].test = [
                [ 'PRIMARY', true, '1', 'cdid', false, 'BTREE', '', '' ],
                [ 'cdid', false, '1', 'cdid', false, 'HASH', '', '' ],
                [ 'cdid_2', false, '1', 'cdid', false, 'BTREE', '', '' ],
                [ 'cdid_2', false, '2', 'rofl_id', false, 'BTREE', '', '' ],
                [ 'cdid_4', false, '2', 'rofl_id', false, 'BTREE', '', '' ]
            ];

            data[ 1 ].atew = [
                [ 'PRIMARY', true, '1', 'twocolumns', false, 'BTREE', '', '' ],
                [ 'fktotest', true, '1', 'id', false, 'BTREE', '', '' ],
                [ 'fktotest', true, '2', 'lol__id', false, 'BTREE', '', '' ],
                [ 'ter', true, '1', 'te', false, 'BTREE', '', '' ],
                [ 'ter', true, '2', 'lol', true, 'BTREE', '', '' ],
                [ 'hthes', false, '1', 'te', false, 'BTREE', '', '' ],
                [ 'roflxD', false, '1', 'lol', true, 'BTREE', '', '' ]
            ];

            data[ 1 ].test = [
                [ 'PRIMARY', true, '1', 'cdid', false, 'BTREE', '', '' ],
                [ 'cdid', false, '1', 'cdid', false, 'BTREE', '', '' ],
                [ 'cdid_2', false, '1', 'cdid', false, 'BTREE', '', '' ],
                [ 'cdid_2', false, '2', 'rofl_id', false, 'BTREE', '', '' ],
                [ 'cdid_3', false, '2', 'rofl_id', false, 'BTREE', '', '' ]
            ];

            callback( context, data );
        },

        getFK: function ( config, tables, context, callback ) {},

        close: function () {}
    },

    config:
    {

        filestring: '%action%_%filename%',
        primary: true,
        beautifier: 'js-beautify',

        beautifier_options:
        {
            indent_size: 4,
            indent_char: ' ',
            indent_with_tabs: false,
            preserve_newlines: true,
            max_preserve_newlines: 10,
            space_in_paren: true,
            e4x: false,
            jslint_happy: true,
            brace_style: 'expand',
            keep_array_indentation: false,
            keep_function_indentation: false,
            eval_code: false,
            unescape_strings: false,
            wrap_line_length: 0,
            break_chained_methods: false
        },
        db_persist: true
    }
};

lab.experiment( 'builder/', { parallel: false }, function ()
{
    var _int = {
            capabilities: []
        },
        _config = {

        },
        build;

    lab.before( function ( done )
    {
        build = new Builder(
            _int,
            undefined,
            'test/migrations',
            _config
        );

        done();
    } );


    lab.experiment( 'subArr',
    {
        parallel: false
    }, function ()
    {

        lab.test( 'returns true if the element itself is null or undefined',
        {
            parallel: false
        }, function ( done )
        {

            Code.expect( build.subArr( undefined, [] ) ).equal( undefined );
            done();
        } );

        lab.test( 'returns true when the processed array was substracted as expected, single layer',
        {
            parallel: false
        }, function ( done )
        {

            var finArr = [ 'test2', 'test4', 'test5' ],
                subArr = [ 'test1', 'test3' ],
                testArr = [ 'test1', 'test2', 'test3', 'test4', 'test5' ];


            var actual = build.subArr( testArr, subArr );

            Code.expect( actual ).to.be.an.array();
            Code.expect( actual ).to.deep.equal( finArr );
            done();
        } );

        lab.test( 'returns true when the processed array was substracted as expected, double layer (only first element counts)',
        {
            parallel: false
        }, function ( done )
        {

            var finArr = [
                [ 'test1', 'test2', 'test3' ],
                [ 'test5', 'test6' ]
            ],
                subArr = [
                    [ 'test4', 'test1' ],
                    [ 'test9', 'test5' ]
                ],
                testArr = [
                    [ 'test1', 'test2', 'test3' ],
                    [ 'test4', 'undefined' ],
                    [ 'test5', 'test6' ]
                ];


            var actual = build.subArr( testArr, subArr );

            Code.expect( actual ).to.be.an.array();
            Code.expect( actual ).to.deep.equal( finArr );
            done();
        } );
    } );


    lab.experiment( 'matchArr',
    {
        parallel: false
    }, function ()
    {

        lab.test( 'returns true if the element itself is null or undefined',
        {
            parallel: false
        }, function ( done )
        {

            Code.expect( build.matchArr( undefined, [] ) ).equal( undefined );
            done();
        } );

        lab.test( 'returns true when the processed array was substracted as expected, single layer',
        {
            parallel: false
        }, function ( done )
        {

            var finArr = [ 'test1' ],
                matchArr = [ 'test1', 'test3' ],
                testArr = [ 'test1', 'test2', 'test4', 'test5' ];


            var actual = build.matchArr( testArr, matchArr );

            Code.expect( actual ).to.be.an.array();
            Code.expect( actual ).to.deep.equal( finArr );
            done();
        } );

        lab.test( 'returns true when the processed array was substracted as expected, double layer (only first element counts)',
        {
            parallel: false
        }, function ( done )
        {

            var finArr = [
                [ 'test4', 'undefined' ]
            ],
                matchArr = [
                    [ 'test4', 'test1' ],
                    [ 'test6', 'test5' ]
                ],
                testArr = [
                    [ 'test1', 'test2', 'test3' ],
                    [ 'test4', 'undefined' ],
                    [ 'test5', 'test6' ]
                ];


            var actual = build.matchArr( testArr, matchArr );

            Code.expect( actual ).to.be.an.array();
            Code.expect( actual ).to.deep.equal( finArr );
            done();
        } );
    } );

    lab.experiment( 'buildArr',
    {
        parallel: false
    }, function ()
    {

        lab.test( 'returns true if one element itself is null or undefined and the other one gets returned',
        {
            parallel: false
        }, function ( done )
        {

            Code.expect( build.buildArr( undefined ) ).equal( undefined );
            done();
        } );

        lab.test( 'returns true when the processed array was build correctly',
        {
            parallel: false
        }, function ( done )
        {

            var finObj = {},
                testArr = [
                    [ 'test1', 'test2', 'test3' ],
                    [ 'test4', 'test5', 'test6' ],
                    [ 'test8', 'test7', 'test3', 'test9' ]
                ];

            finObj.test3 = [
                [ 'test1', 'test2' ],
                [ 'test8', 'test7', 'test9' ]
            ];
            finObj.test6 = [
                [ 'test4', 'test5' ]
            ];

            var actual = build.buildArr( testArr, 2 );

            Code.expect( actual ).to.be.an.object();
            Code.expect( actual ).to.deep.equal( finObj );
            done();
        } );
    } );

    lab.experiment( 'diffArr',
    {
        parallel: false
    }, function ()
    {

        lab.test( 'returns true if the element itself is null or undefined',
        {
            parallel: false
        }, function ( done )
        {

            var finArr1 = [
                [],
                []
            ],
                finArr2 = [
                    [],
                    []
                ],
                diffArr1 = [ 'test1', 'test2' ],
                diffArr2 = [ 'test3', 'test4' ];

            finArr1[ 0 ] = diffArr1;
            finArr2[ 1 ] = diffArr2;


            var res1 = build.diffArr( diffArr1, undefined );
            var res2 = build.diffArr( undefined, diffArr2 );

            Code.expect( res1 ).to.be.an.array();
            Code.expect( res1 ).to.deep.equal( finArr1 );

            Code.expect( res2 ).to.be.an.array();
            Code.expect( res2 ).to.deep.equal( finArr2 );

            done();
        } );

        lab.test( 'returns true when the processed array differences are correct, single layer',
        {
            parallel: false
        }, function ( done )
        {

            var finArr = [
                [],
                [ 'test2', 'test4', 'test5' ]
            ],
                diffArr1 = [ 'test1', 'test3' ],
                diffArr2 = [ 'test1', 'test2', 'test3', 'test4', 'test5' ];

            var actual = build.diffArr( diffArr1, diffArr2 );

            Code.expect( actual ).to.be.an.array();
            Code.expect( actual ).to.deep.equal( finArr );
            done();
        } );

        lab.test( 'returns true when the processed array differences are correct, double layer (only first element)',
        {
            parallel: false
        }, function ( done )
        {

            var finArr = [
                [
                    [ 'test9', 'test5' ]
                ],
                [
                    [ 'test1', 'test2', 'test3' ],
                    [ 'test5', 'test6' ]
                ]
            ],
                diffArr1 = [
                    [ 'test4', 'test1' ],
                    [ 'test9', 'test5' ]
                ],
                diffArr2 = [
                    [ 'test1', 'test2', 'test3' ],
                    [ 'test4', 'undefined' ],
                    [ 'test5', 'test6' ]
                ];

            var actual = build.diffArr( diffArr1, diffArr2 );

            Code.expect( actual ).to.be.an.array();
            Code.expect( actual ).to.deep.equal( finArr );
            done();
        } );
    } );

    lab.experiment( 'moveItem',
    {
        parallel: false
    }, function ()
    {

        lab.test( 'returns true if the given index is the same, the **same** array which was inputted should be returned',
        {
            parallel: false
        }, function ( done )
        {
            var inputArr = [ 'test2', 'test3', 'test4', 'test5', 'test1' ];

            var actual = build.moveItem( inputArr, 2, 2 );

            Code.expect( actual ).equal( inputArr );

            done();
        } );

        lab.test( 'returns true if the given index was moved to the wished new index, less to high index',
        {
            parallel: false
        }, function ( done )
        {

            var finArr = [],
                pairs = [],
                inputArr = [
                    [ 'test2', 'test3', 'test4', 'test5', 'test1' ]
                ];

            finArr[ 0 ] = [
                [ 'test3', 'test4', 'test2', 'test5', 'test1' ]
            ];
            finArr[ 1 ] = [
                [ 'test2', 'test4', 'test5', 'test3', 'test1' ]
            ];
            finArr[ 2 ] = [
                [ 'test2', 'test3', 'test5', 'test1', 'test4' ]
            ];

            pairs[ 0 ] = [ 0, 2 ];
            pairs[ 1 ] = [ 1, 3 ];
            pairs[ 2 ] = [ 2, 4 ];

            for ( var i = 0; i < finArr.length; ++i )
            {
                var actual = build.moveItem( inputArr, pairs[ i ][ 0 ], pairs[ i ][ 1 ] );

                Code.expect( actual ).to.be.an.array();
                Code.expect( actual ).to.deep.equal( finArr[ i ] );
            }

            done();
        } );

        lab.test( 'returns true if the given index was moved to the wished new index, less to high index + overwrite mode',
        {
            parallel: false
        }, function ( done )
        {

            var finArr = [],
                pairs = [],
                inputArr = [
                    [ 'test2', 'test3', 'test4', 'test5', 'test1' ]
                ];

            finArr[ 0 ] = [
                [ 'test3', 'test4', 'test2', 'test1' ]
            ];
            finArr[ 1 ] = [
                [ 'test2', 'test4', 'test3', 'test1' ]
            ];
            finArr[ 2 ] = [
                [ 'test2', 'test3', 'test5', 'test4' ]
            ];

            pairs[ 0 ] = [ 0, 3 ];
            pairs[ 1 ] = [ 1, 3 ];
            pairs[ 2 ] = [ 2, 4 ];

            for ( var i = 0; i < finArr.length; ++i )
            {
                var actual = build.moveItem( inputArr, pairs[ i ][ 0 ], pairs[ i ][ 1 ], true );

                Code.expect( actual ).to.be.an.array();
                Code.expect( actual ).to.deep.equal( finArr[ i ] );
            }

            done();
        } );

        lab.test( 'returns true if the given index was moved to the wished new index, high to less index',
        {
            parallel: false
        }, function ( done )
        {

            var finArr = [],
                pairs = [],
                inputArr = [
                    [ 'test2', 'test3', 'test4', 'test5', 'test1' ]
                ];

            finArr[ 0 ] = [
                [ 'test1', 'test2', 'test3', 'test4', 'test5' ]
            ];
            finArr[ 1 ] = [
                [ 'test2', 'test5', 'test3', 'test4', 'test1' ]
            ];
            finArr[ 2 ] = [
                [ 'test2', 'test3', 'test1', 'test4', 'test5' ]
            ];

            pairs[ 0 ] = [ 4, 0 ];
            pairs[ 1 ] = [ 3, 1 ];
            pairs[ 2 ] = [ 4, 2 ];


            for ( var i = 0; i < finArr.length; ++i )
            {
                var actual = build.moveItem( inputArr, pairs[ i ][ 0 ], pairs[ i ][ 1 ] );

                Code.expect( actual ).to.be.an.array();
                Code.expect( actual ).to.deep.equal( finArr[ i ] );
            }

            done();
        } );

        lab.test( 'returns true if the given index was moved to the wished new index, high to less index + overwrite mode',
        {
            parallel: false
        }, function ( done )
        {

            var finArr = [],
                pairs = [],
                inputArr = [
                    [ 'test2', 'test3', 'test4', 'test5', 'test1' ]
                ];

            finArr[ 0 ] = [
                [ 'test1', 'test3', 'test4', 'test5' ]
            ];
            finArr[ 1 ] = [
                [ 'test2', 'test5', 'test4', 'test1' ]
            ];
            finArr[ 2 ] = [
                [ 'test2', 'test3', 'test1', 'test5' ]
            ];

            pairs[ 0 ] = [ 4, 0 ];
            pairs[ 1 ] = [ 3, 1 ];
            pairs[ 2 ] = [ 4, 2 ];

            for ( var i = 0; i < finArr.length; ++i )
            {
                var actual = build.moveItem( inputArr, pairs[ i ][ 0 ], pairs[ i ][ 1 ], true );

                Code.expect( actual ).to.be.an.array();
                Code.expect( actual ).to.deep.equal( finArr[ i ] );
            }

            done();
        } );
    } );

    lab.test( 'checkCap, returns true if checkCaps validates as expected', { parallel: true }, function ( done )
    {

        Code.expect( build.checkCap( 'getTables', true, function() {} ) ).to.be.an.boolean().and.to.equal( false );
        Code.expect( build.checkCap( 'indizies', true, function() {} ) ).to.be.an.boolean().and.to.equal( false );

        //calling without optional
        Code.expect( build.checkCap( 'indizies', function() {} ) ).to.be.an.boolean().and.to.equal( false );
        Code.expect( build.checkCap( 'getTables', function() {} ) ).to.be.an.boolean().and.to.equal( false );

        _int.capabilities.push( 'tables' );
        Code.expect( build.checkCap( 'getTables', true, function() {} ) ).to.be.an.boolean().and.to.equal( true );


        _int.capabilities.push( 'indizies' );
        Code.expect( build.checkCap( 'indizies', true, function() {} ) ).to.be.an.boolean().and.to.equal( true );

        done();
    } );

    lab.test( 'write(), returns true if write functionality works as expected', { parallel: false }, function ( done )
    {
        var testFile = 'test' + Math.floor( Math.random() * 1000 ) + '.js';

        Code.expect( build.write() ).to.be.an.boolean().and.to.equal( false ); //failing without everything
        Code.expect( build.write( testFile, 'test' ) );
        global.dryRun = false;
        Code.expect( build.write( testFile, 'test' ) );
        global.dryRun = true;
        require( 'fs' ).unlinkSync( 'test/migrations/' + testFile );

        _config.beautifier = 'js-beautify';
        Code.expect( build.write( testFile, 'var test=test ;' ) ).to.be.a.string().and.to.equal( 'var test = test;' );

        _config.beautifier = 'echo test';
        Code.expect( build.write( testFile, 'test' ) ).to.be.a.string().and.to.equal( 'test' );

        done();
    } );

    lab.test( 'assert(), returns true if assert works as expected', { parallel: true }, function ( done )
    {

        var ex;

        Code.expect( build.assert( false, 'Message' ) ).to.be.an.boolean().and.to.equal( true );
        Code.expect( build.assert( true, 'Message' ) ).to.be.an.boolean().and.to.equal( false );
        try
        {
            build.assert( true, { critical: true }, 'Message' );
        }
        catch ( exception )
        {
            ex = exception;
        }

        Code.expect( ex ).to.be.an.boolean().and.to.equal( true );

        done();
    } );
} );

lab.experiment( 'builder', { parallel: false }, function ()
{

    var build;

    lab.before( function ( done )
    {
        build = new Builder(
            internals.driver,
            internals.template,
            'test/migrations'
        );

        build.build( internals.config, function ( next )
        {

            next();
        }, done );
    } );

    lab.test( 'returns true if tables were diffed as expected',
    {
        parallel: true
    }, function ( done )
    {
        var data = [],
            _table = internals.template._table;

        data.deleted = [
            [ 'id', [ 'int', '10', 'unsigned' ], false, null, false, '' ]
        ];
        data.test2 = [
            [ 'id', [ 'int', '10', 'unsigned' ], false, null, false, '' ]
        ];

        for( var i = 0; i < _table.table.length; ++i )
        {
            Code.expect( _table.columns[ i ] ).to.be.an.array().and.to.deep.equal( data[ _table.table[ i ] ] );
        }

        done();
    } );

    lab.test( 'returns true if columns were diffed as expected',
    {
        parallel: true
    }, function ( done )
    {
        var data = [],
            _columns = internals.template._columns;

        data.atew = [
            [ 'deleted', [ 'int', '11', 0 ], false, null, true, '' ]
        ];
        data.test = [
            [ 'deleted', [ 'int', '11', 0 ], false, null, false, '' ]
        ];

        for( var i = 0; i < _columns.table.length; ++i )
        {
            Code.expect( _columns.columns[ i ] ).to.be.an.array().and.to.deep.equal( data[ _columns.table[ i ] ] );
        }

        done();
    } );


    lab.test( 'returns true if driver was closed without problems', function ( done )
    {

        build.close();
        done();
    } );
} );