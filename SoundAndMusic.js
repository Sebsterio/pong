
var	audioFormat;

var hitSound = new SoundOverlapsClass("audio/hit");
var missSound = new SoundOverlapsClass("audio/miss");
var wallSound = new SoundOverlapsClass("audio/wall");


function setFormat()	{
		var	audio	= new Audio();
		if	(audio.canPlayType("audio/mp3"))	{
						audioFormat	= ".mp3";
		}	else	{
						audioFormat	= ".ogg";
		}
}

function SoundOverlapsClass(filenameWithPath)	{
		
		setFormat();
		
		var	mainSound	= new Audio(filenameWithPath+audioFormat);
		var	altSound	= new Audio(filenameWithPath+audioFormat);
		var	altSoundTurn	= false;
		
		this.play = function()	{
				if(altSoundTurn)	{
						altSound.currentTime	= 0;
						altSound.play();
				}	else	{
						mainSound.currentTime	= 0;
						mainSound.play();
				}
				altSoundTurn	= !altSoundTurn;
		}
}

function BackgroundMusicClass()	{

		var	musicSound	= null;
				
		this.loopSong = function(filenameWithPath)	{
				setFormat();
				
				if(musicSound	!= null)	{
						musicSound.pause();
						musicSound	= null;
				}
				musicSound	= new Audio(filenameWithPath+audioFormat);
				musicSound.loop	= true;
				musicSound.play();
		}
		
		this.startOrStopMusic = function()	{
				if(musicSound.paused)	{
						musicSound.play();
				}	else	{
						musicSound.pause();
				}
		}
}