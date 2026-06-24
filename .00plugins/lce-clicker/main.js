//Hi there! it appears someone likes looking at source code OwO

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

				// =========================
				// CORE
				// =========================
				var blocksState = useState(save ? save.blocks : 0);
				var blocks = blocksState[0];
				var setBlocks = blocksState[1];

				var clickPowerState = useState(save ? save.clickPower : 1);
				var clickPower = clickPowerState[0];
				var setClickPower = clickPowerState[1];

				var tabState = useState("shop");
				var tab = tabState[0];
				var setTab = tabState[1];

				// =========================
				// ORES
				// =========================
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

				// =========================
				// CPS BUILDINGS
				// =========================
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

				// =========================
				// SAVE HELPERS
				// =========================
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

				function saveAll(extra) {
					saveData(extra || buildSave());
				}

				// =========================
				// CLICK
				// =========================
				function clickBlock() {
					var newBlocks = blocks + clickPower;
					setBlocks(newBlocks);

					saveAll({
						...buildSave(),
						blocks: newBlocks
					});
				}

				// =========================
				// COSTS
				// =========================
				var woodCost = Math.floor(10 * Math.pow(1.15, woodLevel));
				var stoneCost = Math.floor(25 * Math.pow(1.18, stoneLevel));
				var ironCost = Math.floor(50 * Math.pow(1.20, ironLevel));
				var goldCost = Math.floor(150 * Math.pow(1.22, goldLevel));
				var diamondCost = Math.floor(500 * Math.pow(1.28, diamondLevel));

				var villagerCost = Math.floor(50 * Math.pow(1.15, villagerLevel));
				var ravineCost = Math.floor(250 * Math.pow(1.17, ravineLevel));
				var smelterCost = Math.floor(1000 * Math.pow(1.20, smelterLevel));
				var excavatorCost = Math.floor(5000 * Math.pow(1.25, excavatorLevel));
				var mainframeCost = Math.floor(25000 * Math.pow(1.30, mainframeLevel));

				// =========================
				// BUY ORES
				// =========================
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

				// =========================
				// BUY CPS
				// =========================
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

				// =========================
				// CPS CALC
				// =========================
				var cps =
					villagerLevel * 1 +
					ravineLevel * 5 +
					smelterLevel * 20 +
					excavatorLevel * 100 +
					mainframeLevel * 500;

				// =========================
				// TICK
				// =========================
				useEffect(function () {
					var interval = setInterval(function () {
						if (cps > 0) {
							setBlocks(function (prev) {
								var newVal = prev + cps;

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

				// =========================
				// UI
				// =========================
				return h(
					"div",
					{ className: "w-full max-w-5xl mx-auto p-4 flex flex-col gap-4" },

					// BACK BUTTON
					h(
						"button",
						{
							className:
								"text-sm text-[#A0A0A0] hover:text-[#FFFF55] mc-text-shadow cursor-pointer",
							onClick: function () {
								api.views.navigate("settings");
							}
						},
						"← Back"
					),

					// TITLE
					h(
						"div",
						{ className: "text-2xl font-bold mc-text-shadow" },
						"LCE Block Clicker"
					),

					// MAIN LAYOUT
					h(
						"div",
						{ className: "flex gap-4" },

						// LEFT
						h(
							"div",
							{ className: "flex-1 flex flex-col gap-4" },

							h(
								"div",
								{ className: "border border-[#555] bg-black/40 p-3 text-center" },
								h("div", { className: "text-xs text-[#888]" }, "Blocks"),
								h("div", { className: "text-2xl font-bold" }, blocks.toLocaleString())
							),

							h("div", {}, "Click Power: " + clickPower),
							h("div", {}, "CPS: " + cps),

							h(
								"button",
								{
									className:
										"px-2 py-2 text-white mc-text-shadow cursor-pointer border border-[#555] bg-black/40 hover:bg-black/60",
									onClick: clickBlock,
									style: {
										backgroundImage: "url('/images/Button_Background.png')",
										backgroundSize: "100% 100%",
										imageRendering: "pixelated",
										minWidth: "250px"
									}
								},
								"⛏ Mine Block"
							)
						),

						// RIGHT
						h(
							"div",
							{ className: "w-64 border border-[#555] bg-black/40 p-3 flex flex-col gap-2" },

							h(
								"div",
								{ className: "flex gap-2 mb-2" },

								h(
									"button",
									{
										className: "flex-1 px-2 py-1 border border-[#555] bg-black/40",
										onClick: function () {
											setTab("shop");
										}
									},
									"Shop"
								),

								h(
									"button",
									{
										className: "flex-1 px-2 py-1 border border-[#555] bg-black/40",
										onClick: function () {
											setTab("stats");
										}
									},
									"Stats"
								)
							),

							tab === "shop"
								? h(
										"div",
										{},
										h("div", {}, "ORES"),
										btn("Wood - " + woodCost, buyWood),
										btn("Stone - " + stoneCost, buyStone),
										btn("Iron - " + ironCost, buyIron),
										btn("Gold - " + goldCost, buyGold),
										btn("Diamond - " + diamondCost, buyDiamond),

										h("div", { className: "mt-2" }, "CPS"),
										btn("Villager - " + villagerCost, buyVillager),
										btn("Ravine - " + ravineCost, buyRavine),
										btn("Super Smelter - " + smelterCost, buySmelter),
										btn("LCE Excavator - " + excavatorCost, buyExcavator),
										btn("LCE Mainframe - " + mainframeCost, buyMainframe)
									)
								: h(
										"div",
										{},
										h("div", {}, "Blocks: " + blocks.toLocaleString()),
										h("div", {}, "Click: " + clickPower),
										h("div", {}, "CPS: " + cps)
									)
						)
					)
				);

				function btn(text, fn) {
					return h(
						"button",
						{
							onClick: fn,
							className:
								"w-full px-2 py-1 border border-[#555] bg-black/40 text-white hover:bg-black/60 mc-text-shadow"
						},
						text
					);
				}
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
