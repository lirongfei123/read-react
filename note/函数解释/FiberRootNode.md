纤维节点
this.tag = tag;
this.current = null;
this.containerInfo = containerInfo;
this.pendingChildren = null;
this.pingCache = null;
this.finishedExpirationTime = _ReactFiberExpirationTime.NoWork;
this.finishedWork = null;
this.timeoutHandle = _ReactFiberHostConfig.noTimeout;
this.context = null;
this.pendingContext = null;
this.hydrate = hydrate;
this.callbackNode = null;
this.callbackPriority = _SchedulerWithReactIntegration.NoPriority;
this.firstPendingTime = _ReactFiberExpirationTime.NoWork;
this.firstSuspendedTime = _ReactFiberExpirationTime.NoWork;
this.lastSuspendedTime = _ReactFiberExpirationTime.NoWork;
this.nextKnownPendingLevel = _ReactFiberExpirationTime.NoWork;
this.lastPingedTime = _ReactFiberExpirationTime.NoWork;
this.lastExpiredTime = _ReactFiberExpirationTime.NoWork;
if (_ReactFeatureFlags.enableSchedulerTracing) {
    this.interactionThreadID = (0, _tracing.unstable_getThreadID)();
    this.memoizedInteractions = new Set();
    this.pendingInteractionMap = new Map();
}
if (_ReactFeatureFlags.enableSuspenseCallback) {
    this.hydrationCallbacks = null;
}