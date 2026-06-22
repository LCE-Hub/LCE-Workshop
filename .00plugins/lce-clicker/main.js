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

				var blocksState = useState(save ? save.blocks : 0);
				var blocks = blocksState[0];
				var setBlocks = blocksState[1];

				var clickPowerState = useState(save ? save.clickPower : 1);
				var clickPower = clickPowerState[0];
				var setClickPower = clickPowerState[1];

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

				function clickBlock() {
					var newBlocks = blocks + clickPower;
					setBlocks(newBlocks);

					saveAll({
						...buildSave(),
						blocks: newBlocks
					});
				}

				var woodCost = Math.floor(10 * Math.pow(1.15, woodLevel));
				var stoneCost = Math.floor(25 * Math.pow(1.18, stoneLevel));
				var ironCost = Math.floor(50 * Math.pow(1.2, ironLevel));
				var goldCost = Math.floor(150 * Math.pow(1.22, goldLevel));
				var diamondCost = Math.floor(500 * Math.pow(1.28, diamondLevel));

				var villagerCost = Math.floor(50 * Math.pow(1.15, villagerLevel));
				var ravineCost = Math.floor(250 * Math.pow(1.17, ravineLevel));
				var smelterCost = Math.floor(1000 * Math.pow(1.2, smelterLevel));
				var excavatorCost = Math.floor(5000 * Math.pow(1.25, excavatorLevel));
				var mainframeCost = Math.floor(25000 * Math.pow(1.3, mainframeLevel));

				var cps =
					villagerLevel * 1 +
					ravineLevel * 5 +
					smelterLevel * 20 +
					excavatorLevel * 100 +
					mainframeLevel * 500;

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

				function btn(text, onClick, disabled) {
					return h(
						"button",
						{
							onClick: onClick,
							disabled: disabled,
							className:
								"w-full px-2 py-1 text-white mc-text-shadow cursor-pointer border border-[#555] bg-black/40 hover:bg-black/60"
						},
						text
					);
				}

				return h(
					"div",
					{ className: "w-full max-w-5xl mx-auto p-4 flex flex-col gap-4" },

					h(
						"div",
						{ className: "text-2xl font-bold mc-text-shadow" },
						"LCE Block Clicker"
					),

					h(
						"div",
						{ className: "flex gap-4" },

						// LEFT PANEL
						h(
							"div",
							{ className: "flex-1 flex flex-col gap-4" },

							h(
								"div",
								{ className: "border border-[#555] bg-black/40 p-3 text-center" },
								h("div", { className: "text-xs text-[#888]" }, "Blocks"),
								h("div", { className: "text-2xl font-bold mc-text-shadow" }, blocks.toLocaleString())
							),

							h("div", { className: "text-sm text-[#aaa]" }, "Click Power: " + clickPower),
							h("div", { className: "text-sm text-[#aaa]" }, "CPS: " + cps),

							h(
								"button",
								{
									onClick: clickBlock,
									className:
										"px-2 py-2 text-white mc-text-shadow cursor-pointer border border-[#555] bg-black/40 hover:bg-black/60",
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

						// RIGHT PANEL
						h(
							"div",
							{ className: "w-64 border border-[#555] bg-black/40 p-3 flex flex-col gap-2" },

							h("div", { className: "text-xs text-[#888] uppercase tracking-widest" }, "Shop"),

							btn("Wood - " + woodCost, function () {}),
							btn("Stone - " + stoneCost),
							btn("Iron - " + ironCost),
							btn("Gold - " + goldCost),
							btn("Diamond - " + diamondCost),

							h("div", { className: "text-xs text-[#888] uppercase tracking-widest mt-2" }, "CPS"),

							btn("Villager - " + villagerCost),
							btn("Ravine - " + ravineCost),
							btn("Super Smelter - " + smelterCost),
							btn("LCE Excavator - " + excavatorCost),
							btn("LCE Mainframe - " + mainframeCost)
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
