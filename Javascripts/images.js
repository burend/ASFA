// Images for events/scenes
var oImages = {
	
// fixed: images in the game with set filenames controlled in sourcecode. Person independent
fixed: {
	magazines_hard: 23,	// Magazines in your storage chest, hardcore. Numeric suffix, no limit, last image is fixed, female player only
	magazines_soft: 16,	// Magazines in your storage chest, softore.  Numeric suffix, no limit
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
		blowjob_blackhair: 1,
		blowjob_blondehiar: 2,
		blowjob_brownhair: 2,
		blowjob_redhair: 2,
		lick: 3,
		pussy: 3
	},
	threesome: {
		mff: 2,
		mmf_blondehair: 1,
		all: 2
	},
	tgm2f: 1,
	tgf2m: 1,
	
	Explicit: {
		femalefemale: {
			analstrapon: 2,
			doubledildo: 2,
			lick: 7,
			strapon: 8,
			trib: 6
		},
		futafemale: {
			pussy: 1
		},
		malefemale: {
			analstrapon: 3,
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
	Brandi: {
		poledance: 2
	},
	Glenvale: {
		aquarium: 6,
		aquariumnude: 1,
		church: 5,
		churchnude: 1,		
		generalstore: 2,
		generalstorenude: 1,
		generalstorepublic: 1,
		gym: 3,
		gymnude: 1,
		laundromat: 4,
		library: 2,
		librarynude: 3,
		librarypublic: 4,
		museum: 4,
		museumnude: 3,
		museumpublic: 3,
		park: 7,
		parknude: 7,
		parkpublic: 9,
		pool: 7,
		poolnude: 12,
		poolpublic: 5,
		shops: 3,
		shopsnude: 2,
		shopspublic: 2,
		streets: 10,
		streetsnude: 7,
		streetspublic: 5,
		sportsfield: 3,
		sportsfieldnude: 4,
		stripclub: 5,
		tennis: 4,
		tennisnude: 2,
		wildranges: 3,
		wildrangesnude: 2
	},
	MissLogan: {
		pc: 20,
		pctitus: 20
	},
	MrsGranger: {
		hotelroomb: 1,
		hotelroomg: 1,
		Explicit: {
			hotelroomb: 1
		}
	},
	VampyreLilith: {
		poledance: 2,
		movie: 3
	}
},

// Player avatars
Player: {}
};
