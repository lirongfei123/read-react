/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const path = require("path");
// module.paths.unshift(path.join(__dirname, '../react-master/node_modules'));
const obj = {
	'shared/ReactSharedInternals': 'react/src/ReactSharedInternals',
    'scheduler/src/SchedulerFeatureFlags': 'scheduler/src/SchedulerFeatureFlags',
    'scheduler/src/SchedulerHostConfig': 'scheduler/src/forks/SchedulerHostConfig.default',
    // 'react/src/ReactSharedInternals.js': 'react/src/forks/ReactSharedInternals.umd.js',
    // 'object-assign': 'shared/forks/object-assign.umd.js',
    // "scheduler": 'shared/forks/Scheduler.umd.js',
    // 'scheduler/tracing': 'shared/forks/SchedulerTracing.umd.js',
    'scheduler/src/SchedulerFeatureFlags': 'scheduler/src/SchedulerFeatureFlags',
    'scheduler/src/SchedulerHostConfig': 'scheduler/src/forks/SchedulerHostConfig.default',
    // 'react/src/ReactSharedInternals.js': 'react/src/forks/ReactSharedInternals.umd.js',
    'react-reconciler/src/ReactFiberHostConfig': 'react-reconciler/src/forks/ReactFiberHostConfig.dom.js',
    'react-server/src/ReactServerHostConfig': 'react-server/src/forks/ReactServerHostConfig.dom.js',
    'react-server/src/ReactServerFormatConfig': 'react-server/src/forks/ReactServerFormatConfig.dom.js',
    'react-flight/src/ReactFlightClientHostConfig': 'react-flight/src/forks/ReactFlightClientHostConfig.dom.js',
    'legacy-events/ResponderTopLevelEventTypes': 'legacy-events/forks/ResponderTopLevelEventTypes.dom.js'
}
class ReactRuntimeReplace {
	constructor(resourceRegExp, newResource) {
        this.moduleMap = new Map();
        Object.keys(obj).forEach((srcModule) => {
            this.moduleMap.set(require.resolve(srcModule), require.resolve(obj[srcModule]));
        });
	}
	apply(compiler) {
		compiler.hooks.normalModuleFactory.tap(
			"react-runtime-replace",
			nmf => {
				nmf.hooks.afterResolve.tap("react-runtime-replace", result => {
					if (!result) return;
                    if (this.moduleMap.has(result.resource)) {
                        result.resource = this.moduleMap.get(result.resource);
                    }
				});
			}
		);
	}
}
module.exports = ReactRuntimeReplace;

