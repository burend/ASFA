// Images for events/scenes
var oImages = {
	
// fixed: images in the game with set filenames controlled in sourcecode. Person independent
fixed: {
	magazines_hard: 23,	// Magazines in your storage chest, hardcore. Numeric suffix, no limit
	magazines_soft: 10,	// Magazines in your storage chest, softore.  Numeric suffix, no limit, last image is fixed, female player only
	occult_books: 17,		// Occult books to study with Sir Ronald. Note: strictly a-z suffix supported currently, so 26 max
	monsters: 8,			// Monsters in the Sacred Clearing. a-z suffix
	phonewallpapers: 20,	// Wallpaper images in your phone, max 32
	tvplain: 1,				// Boring TV shows at home. Numeric suffix, unlimited
	tvkink: 8				// More kinky TV shows. Numeric suffix, unlimited. id 1,2 should be news type programs
},

// Generic images for use in sex scenes
GenericSex: {
	breastexpansion: 4,
	breastreduction: 4,
	cockexpansion: 1,
	creampie: 2,
	foursome: 2,
	femalefemale: {
		lick: 1,
		trib: 2
	},
	futafemale: {
		pussy: 1
	},
	malefemale: {
		blowjob_blonde: 2,
		blowjob_brown: 2,
		blowjob_red: 2,
		lick: 3,
		pussy: 3
	},
	threesome: {
		mff: 2,
		mmf_blonde: 1,
		all: 2
	},
	tgm2f: 1,
	tgf2m: 1,
	
	Explicit: {
		femalefemale: {
			anal_strapon: 2,
			doubledildo: 2,
			lick: 7,
			strapon: 8,
			trib: 6
		},
		futafemale: {
			pussy: 1
		},
		malefemale: {
			anal_strapon: 3,
			anal: 4,
			blowjob: 5,
			pussy: 8,
			titfuck: 2
		},
		malemale: {
			anal: 2
		},
		threesome: {
			fff: 4,
			mff: 8,
			mff_red: 1,
			mff_oral: 5,
			mmf: 5
		}
	}
},

// Characters, child objects are named for the folders they use
People: {
	Glenvale: {
		stripclub: 4,
		laundromat: 4,
		park: 7,
		parknude: 6,
		pool: 6,
		poolnude: 8,
		church: 4,
		churchnude: 1,
		streets: 8,
		streetsnude: 8,
		sportsfield: 3,
		sportsfieldnude: 4
	},
	MissLogan: {
		pc: 20,
		pctitus: 20
	}
},

// Player avatars
Player: {}
};
