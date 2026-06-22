(function () {
	var STORAGE_KEY = "lceclicker_blocks";

	function loadData() {
		try {
			var data = api.storage.get(STORAGE_KEY);
			if (!data) return null;
			return JSON.parse(data);
		} catch (e) {
			return null;
		}
	}

	function saveData(data) {
		api.storage.set(STORAGE_KEY, JSON.stringify(data));
	}

	api.views.register(
		"lceclicker",
		function (api) {
			var h = api.React.createElement;
			var useState = api.React.useState;
			var useEffect = api.React.useEffect;

			return function LCEClickerView() {

				var save = loadData();

				// =====================
				// CORE VALUES
				// =====================
				var blocksState = useState(save ? save.blocks : 0);
				var blocks = blocksState[0];
				var setBlocks = blocksState[1];

				var clickPowerState = useState(save ? save.clickPower : 1);
				var clickPower = clickPowerState[0];
				var setClickPower = clickPowerState[1];

				var tabState = useState("shop");
				var tab = tabState[0];
				var setTab = tabState[1];

				// =====================
				// ORE UPGRADES
				// =====================
				var woodLevelState = useState(save ? save.woodLevel : 0);
				var woodLevel = woodLevelState[0];
				var setWoodLevel = woodLevelState[1];

				var stoneLevelState = useState(save ? save.stoneLevel : 0);
				var stoneLevel = stoneLevelState[0];
				var setStoneLevel = stoneLevelState[1];

				var ironLevelState = useState(save ? save.ironLevel : 0);
				var ironLevel = ironLevelState[0];
				var setIronLevel = ironLevelState[1];

				var goldLevelState = useState(save ? save.goldLevel : 0);
				var goldLevel = goldLevelState[0];
				var setGoldLevel = goldLevelState[1];

				var diamondLevelState = useState(save ? save.diamondLevel : 0);
				var diamondLevel = diamondLevelState[0];
				var setDiamondLevel = diamondLevelState[1];

				// =====================
				// CPS BUILDINGS
				// =====================
				var villagerLevelState = useState(save ? save.villagerLevel : 0);
				var villagerLevel = villagerLevelState[0];
				var setVillagerLevel = villagerLevelState[1];

				var ravineLevelState = useState(save ? save.ravineLevel : 0);
				var ravineLevel = ravineLevelState[0];
				var setRavineLevel = ravineLevelState[1];

				var smelterLevelState = useState(save ? save.smelterLevel : 0);
				var smelterLevel = smelterLevelState[0];
				var setSmelterLevel = smelterLevelState[1];

				var excavatorLevelState = useState(save ? save.excavatorLevel : 0);
				var excavatorLevel = excavatorLevelState[0];
				var setExcavatorLevel = excavatorLevelState[1];

				var mainframeLevelState = useState(save ? save.mainframeLevel : 0);
				var mainframeLevel = mainframeLevelState[0];
				var setMainframeLevel = mainframeLevelState[1];

				// =====================
				// SAVE SYSTEM
				// =====================
				function saveAll(data) {
					saveData(data);
				}

				function buildSave() {
					return {
						blocks,
						clickPower,

						woodLevel,
						stoneLevel,
						ironLevel,
						goldLevel,
						diamondLevel,

						villagerLevel,
						ravineLevel,
						smelterLevel,
						excavatorLevel,
						mainframeLevel
					};
				}

				// =====================
				// CLICK
				// =====================
				function clickBlock() {
					var newBlocks = blocks + clickPower;
					setBlocks(newBlocks);

					saveAll({
						...buildSave(),
						blocks: newBlocks
					});
				}

				// =====================
				// COSTS (ORE)
				// =====================
				var woodCost = Math.floor(10 * Math.pow(1.15, woodLevel));
				var stoneCost = Math.floor(25 * Math.pow(1.18, stoneLevel));
				var ironCost = Math.floor(50 * Math.pow(1.2, ironLevel));
				var goldCost = Math.floor(150 * Math.pow(1.22, goldLevel));
				var diamondCost = Math.floor(500 * Math.pow(1.28, diamondLevel));

				// =====================
				// COSTS (CPS)
				// =====================
				var villagerCost = Math.floor(50 * Math.pow(1.15, villagerLevel));
				var ravineCost = Math.floor(250 * Math.pow(1.17, ravineLevel));
				var smelterCost = Math.floor(1000 * Math.pow(1.2, smelterLevel));
				var excavatorCost = Math.floor(5000 * Math.pow(1.25, excavatorLevel));
				var mainframeCost = Math.floor(25000 * Math.pow(1.3, mainframeLevel));

				// =====================
				// BUY ORES
				// =====================
				function buyWood() {
					if (blocks < woodCost) return;
					var b = blocks - woodCost;
					setBlocks(b);
					setClickPower(clickPower + 1);
					setWoodLevel(woodLevel + 1);

					saveAll({ ...buildSave(), blocks: b });
				}

				function buyStone() {
					if (blocks < stoneCost) return;
					var b = blocks - stoneCost;
					setBlocks(b);
					setClickPower(clickPower + 2);
					setStoneLevel(stoneLevel + 1);

					saveAll({ ...buildSave(), blocks: b });
				}

				function buyIron() {
					if (blocks < ironCost) return;
					var b = blocks - ironCost;
					setBlocks(b);
					setClickPower(clickPower + 3);
					setIronLevel(ironLevel + 1);

					saveAll({ ...buildSave(), blocks: b });
				}

				function buyGold() {
					if (blocks < goldCost) return;
					var b = blocks - goldCost;
					setBlocks(b);
					setClickPower(clickPower + 5);
					setGoldLevel(goldLevel + 1);

					saveAll({ ...buildSave(), blocks: b });
				}

				function buyDiamond() {
					if (blocks < diamondCost) return;
					var b = blocks - diamondCost;
					setBlocks(b);
					setClickPower(clickPower + 10);
					setDiamondLevel(diamondLevel + 1);

					saveAll({ ...buildSave(), blocks: b });
				}

				// =====================
				// BUY CPS
				// =====================
				function buyVillager() {
					if (blocks < villagerCost) return;
					var b = blocks - villagerCost;
					setBlocks(b);
					setVillagerLevel(villagerLevel + 1);
					saveAll({ ...buildSave(), blocks: b });
				}

				function buyRavine() {
					if (blocks < ravineCost) return;
					var b = blocks - ravineCost;
					setBlocks(b);
					setRavineLevel(ravineLevel + 1);
					saveAll({ ...buildSave(), blocks: b });
				}

				function buySmelter() {
					if (blocks < smelterCost) return;
					var b = blocks - smelterCost;
					setBlocks(b);
					setSmelterLevel(smelterLevel + 1);
					saveAll({ ...buildSave(), blocks: b });
				}

				function buyExcavator() {
					if (blocks < excavatorCost) return;
					var b = blocks - excavatorCost;
					setBlocks(b);
					setExcavatorLevel(excavatorLevel + 1);
					saveAll({ ...buildSave(), blocks: b });
				}

				function buyMainframe() {
					if (blocks < mainframeCost) return;
					var b = blocks - mainframeCost;
					setBlocks(b);
					setMainframeLevel(mainframeLevel + 1);
					saveAll({ ...buildSave(), blocks: b });
				}

				// =====================
				// CPS CALC
				// =====================
				var cps =
					villagerLevel * 1 +
					ravineLevel * 5 +
					smelterLevel * 20 +
					excavatorLevel * 100 +
					mainframeLevel * 500;

				// =====================
				// TICK
				// =====================
				useEffect(function () {
					var interval = setInterval(function () {
						if (cps > 0) {
							setBlocks(function (prev) {
								var newVal = prev + cps;
								setBlocks(newVal);

								saveAll({
									...buildSave(),
									blocks: newVal
								});

								return newVal;
							});
						}
					}, 1000);

					return function () {
						clearInterval(interval);
					};
				}, [cps]);

				// =====================
				// UI
				// =====================
				return h(
					"div",
					{ className: "w-full max-w-5xl mx-auto p-4 flex flex-col gap-4" },

					h("button", {
						onClick: function () {
							api.views.navigate("settings");
						}
					}, "← Back"),

					h("div", { className: "text-2xl font-bold" }, "LCE Block Clicker"),

					h(
						"div",
						{ className: "flex gap-4" },

						// LEFT
						h(
							"div",
							{ className: "flex-1 flex flex-col gap-4" },

							h("div", {}, "Blocks: " + blocks.toLocaleString()),
							h("div", {}, "Click: " + clickPower),
							h("div", {}, "CPS: " + cps),

							h(
								"button",
								{ onClick: clickBlock },
								"⛏ Mine Block"
							)
						),

						// RIGHT
						h(
							"div",
							{ className: "w-64 flex flex-col gap-2" },

							h("div", {}, "SHOP"),

							h("button", { onClick: buyWood }, "Wood " + woodCost),
							h("button", { onClick: buyStone }, "Stone " + stoneCost),
							h("button", { onClick: buyIron }, "Iron " + ironCost),
							h("button", { onClick: buyGold }, "Gold " + goldCost),
							h("button", { onClick: buyDiamond }, "Diamond " + diamondCost),

							h("div", {}, "CPS"),

							h("button", { onClick: buyVillager }, "Villager " + villagerCost),
							h("button", { onClick: buyRavine }, "Ravine " + ravineCost),
							h("button", { onClick: buySmelter }, "Super Smelter " + smelterCost),
							h("button", { onClick: buyExcavator }, "LCE Excavator " + excavatorCost),
							h("button", { onClick: buyMainframe }, "LCE Mainframe " + mainframeCost)
						)
					)
				);
			};
		},
		{ label: "LCE Block Clicker" }
	);

	api.actions.register("settings-tab", {
		id: "lceclicker",
		label: "LCE Clicker",
		onClick: function () {
			api.views.navigate("lceclicker");
		}
	});
})();
