function assertNearlyEqual(label, actual, expected, tolerance = 0.0001) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`${label}: expected ${expected}, received ${actual}`);
  }
}

function positionRealizedPnl(side, entryPrice, exitPrice, quantity) {
  return side === "short"
    ? (entryPrice - exitPrice) * quantity
    : (exitPrice - entryPrice) * quantity;
}

function positionCashDeltas({ side, quantity, entryPrice, exitPrice, leverage, feeRate }) {
  const openingExposure = quantity * entryPrice;
  const closingExposure = quantity * exitPrice;
  const margin = openingExposure / leverage;
  const openingFee = openingExposure * feeRate;
  const closingFee = closingExposure * feeRate;
  const realizedPnl = positionRealizedPnl(side, entryPrice, exitPrice, quantity);
  const openingDelta = -(margin + openingFee);
  const closingDelta = margin + realizedPnl - closingFee;

  return {
    margin,
    openingFee,
    realizedPnl,
    closingFee,
    openingDelta,
    closingDelta,
    totalDelta: openingDelta + closingDelta
  };
}

const amdShort = positionCashDeltas({
  side: "short",
  quantity: 180,
  entryPrice: 541.73,
  exitPrice: 538.06,
  leverage: 2,
  feeRate: 0.0005
});

assertNearlyEqual("SHORT AMD margin", amdShort.margin, 48755.7);
assertNearlyEqual("SHORT AMD opening fee", amdShort.openingFee, 48.7557);
assertNearlyEqual("SHORT AMD realized P/L", amdShort.realizedPnl, 660.6);
assertNearlyEqual("SHORT AMD closing fee", amdShort.closingFee, 48.4254);
assertNearlyEqual("SHORT AMD total cash delta", amdShort.totalDelta, 563.4189);

const longExample = positionCashDeltas({
  side: "long",
  quantity: 35,
  entryPrice: 4801.76,
  exitPrice: 4836.51,
  leverage: 3,
  feeRate: 0.0005
});

assertNearlyEqual("LONG x3 realized P/L", longExample.realizedPnl, 1216.25);

const sdotShort = positionCashDeltas({
  side: "short",
  quantity: 1250,
  entryPrice: 81.64,
  exitPrice: 55.74,
  leverage: 3,
  feeRate: 0.0005
});

assertNearlyEqual("SHORT SDOT 1250 realized P/L", sdotShort.realizedPnl, 32375);
assertNearlyEqual("SHORT SDOT 1250 closing cash delta", sdotShort.closingDelta, 66356.82916666666);

const sdotShortSmall = positionCashDeltas({
  side: "short",
  quantity: 350,
  entryPrice: 69.22,
  exitPrice: 56.87,
  leverage: 1,
  feeRate: 0.0005
});

assertNearlyEqual("SHORT SDOT 350 realized P/L", sdotShortSmall.realizedPnl, 4322.5);
assertNearlyEqual("SHORT SDOT 350 closing cash delta", sdotShortSmall.closingDelta, 28539.54775);
assertNearlyEqual("SHORT losing trade P/L", positionRealizedPnl("short", 55, 60, 10), -50);

const normalBuyDelta = -(100 * 20 + 100 * 20 * 0.0005);
const normalSellDelta = 100 * 22 - 100 * 22 * 0.0005;
assertNearlyEqual("NORMAL BUY cash delta", normalBuyDelta, -2001);
assertNearlyEqual("NORMAL SELL cash delta", normalSellDelta, 2198.9);

console.log("Investment accounting arithmetic checks passed.");
