
Show HN: Channel Surfer – Watch YouTube like it’s cable TV

Search
Show HN: Channel Surfer – Watch YouTube like it’s cable TV
channelsurfer.tv • 489 points • kilroy123 • 16 hours ago
146 comments
mind_heist • 12 hours ago
There is something absolutely oddly satisfying about using this app. Though there are a handful of channel -- this feels far more "bounded" that using Youtube as is. I spend so much more time on YT over other streaming services and platforms (and have YT premium too). I feel YT natively does a very terrible job of presenting "recommendations" to me. I can't put my finger on what it is, but your cable TV style wrapper feels very home :) Couple of questions
- How did you achieve the grainy cable TV style texture on your videos ?

- Are the videos curated ? Sometimes I waste a lot of time looking for quality content, or sometimes its good quality but you just don't vibe with the presenter or their style - so you continue to click around.

ondrek • 46 minutes ago
I miss the times when someone else made recommendations for you. Now I’m stuck with the same content, which I like( don’t get me wrong), but I’m pretty sure our view of music and movies is much narrower nowadays, when we’re no longer "forced" to experience different content.
kilroy123 • 11 hours ago
Thank you for the kind words. I was going for that feel.
The grainy interlace effect is just good old-fashioned CSS. :)

It is curated! I will seriously do a lot more work on making it better. Especially the music, it's a bit redundant right now.

I haven't had time to get to that. This has really blown up and even been in the news, so it's been hectic.

skrebbel • 10 hours ago
I feel like your excellent curation is a big part of the magic here. Amazing work.
spudlyo • 16 hours ago
It just so happens I'm right in the middle of trying to change how I watch YouTube at my computer. Despite my best efforts, I find myself getting sucked into shorts, so I'm starting investigate if I can take advantage of YouTube RSS syndication. I recently build yt-dlp and got all the dependencies sorted out, so I can bring videos to my machine locally. I'm also checking out elfeed[0] which is an Emacs based RSS reader, and elfeed-tube[1] which further customizes the elfeed experience for YouTube as well as adding an mpv integration that lets you control video playback directly from Emacs.
[0]: https://github.com/skeeto/elfeed

[1]: https://github.com/karthink/elfeed-tube

kaergaard • 12 hours ago
Not sure if this fits to your needs, but uBlock Origin lets you block elements directly on the page. It works great for removing the pesky shorts section. Haven't seen Youtube shorts since. On top of that, i removed the "suggested videos" on the right side of an already opened video, to avoid the pitfall of continuously moving on to barely related stuff, much like the shorts doomscrolling.
I believe Brave too, has this feature.

spudlyo • 9 hours ago
Thanks, I ended up using this list[0] from github, and it worked great. I'm still fooling around with RSS and Emacs, but for now the problem is solved.
[0]: https://github.com/gijsdev/ublock-hide-yt-shorts

antfarm • 46 minutes ago
Try the UnTrap extension. It lets you configure away the things that distract you.
https://untrap.app/

It used to be one time purchase, looks like they turned it into a subscription.

karthink • 14 hours ago
As a clarification, you don't need elfeed-tube to subscribe to YouTube feeds (channels or playlists) with elfeed, or to watch the videos with mpv. elfeed-tube only adds text to the feed entries, in the form of more video metadata, transcripts and synced playback with mpv.
Also, mpv supports lua scripts for a variety of actions on YouTube (or other streaming) videos, such as showing you YouTube's recommended videos in the video player, clipping and downloading videos, sponsorblock and submitting sponsorblock segments, and so on.

I've been doing this for almost a decade, and I do recommend it. In my experience, just importing my YouTube subscriptions into a feed reader was a positive experience. I've had a daily digest of mostly interesting videos and rarely (if ever) the urge to browse YouTube.

But with YouTube's recommendation algorithm out of the picture, it does mean that you'll have to find some other way of discovering new channels.

et1337 • 15 hours ago
Turn off your watch history. It disables the front page and shorts, but you can still watch any video you want and also follow your subscriptions. You still get recommendations next to each video but I find those much less problematic personally.
LorenDB • 14 hours ago
Unfortunately, with watch history off, YouTube still pushes Shorts in the subscriptions page (at least on mobile web, which is where I primarily use YouTube).
cubefox • 13 hours ago
The Unhook browser extension gets rid of that. And optionally other things.
downsplat • 14 hours ago
You've probably already done this, but first thing, turn off autoplay and make sure it stays off. Much easier to not get sucked into things when you have to actively click on them.
j45 • 14 hours ago
Turning Autoplay off, and getting rid of ads (Youtube Premium is well worth it across all devices) is a big level up. Blocking shorts is the other thing.
darepublic • 13 hours ago
There are solutions for blocking shorts. Ie unblock origin filters, as seen previously on front page of HN
dexterdog • 12 hours ago
There are also solutions for blocking ads without subscribing to premium.
jamiek88 • 8 hours ago
If we all did that they wouldn’t offer an ad free option.
I’m happy to pay so others don’t have to, I’ve been both sides of this fence.

YouTube premium is good value imo.

userbinator • 4 hours ago
The "ad free option" is also called "muting and looking away". Don't let them trick you into thinking they have the right and control to shove anything they want into your mind.
Wowfunhappy • 12 hours ago
Fwiw, I made something similar, but it targets an ancient version of OS X. It's theoretically possible it works on modern macOS too, but I haven't tested it.
https://github.com/Wowfunhappy/media-subscriptions-prefpane

I've been using a version of this for five years, although until recently the PrefPane was built via janky Applescript. I rewrote it in proper Objective-C last summer.

bombcar • 15 hours ago
I do something similar as I hate interruptions of various kinds; what I'd love is a way to show a YT playlist in something like Jellyfin, where it downloads the "next" episode while you're watching the current one.
As it is, I can do that somewhat manually and it makes for a nice interface where I'm sure what the kids are watching.

sky2224 • 6 hours ago
fwiw regarding getting sucked into youtube shorts: if you turn off your watch history youtube refuses to let shorts work. It will literally say, "turn on your watch history to continue with shorts".
MintPaw • 14 hours ago
I did this too, I have pi that downloads and combined a bunch of rss feeds every 30min (cron) and downloads the vids, I browse them with Thunderbird on my desktop, I inject a special link to the mp4 on my pi. So I can just watch vids at 192.168.1.106/videos/X.mp4 using the Firefox mp4 player.
Did it in ~300 lines of node.js, was trying to learn how to use JS for server stuff, seemed like a good idea at the time. It still works 5 years later, but it stands as a reminder to me to never use async/await.

normie3000 • 14 hours ago
> a reminder to me to never use async/await
What issues did you face with async/await?

cluckindan • 12 hours ago
Not using async/await is worse: you get sucked into then/catch, or worse, callback hell or shudder streams, which are known to be full of footguns and typically only approximate working correctly.
Of course you can go full sync if your app wouldn’t do anything useful during the time it’s blocked waiting for network or I/O.

tssva • 15 hours ago
There are greasemonkey scripts available which hide shorts from appearing.
Contortion • 15 hours ago
Reminds me of https://ytch.tv/ which I really like for its simplicity.
vunderba • 13 hours ago
Which coincidentally also hit the front page on HN a few years back!
https://news.ycombinator.com/item?id=41247023

I like that this one adds a classic blue cable guide though.

realityfactchex • 10 hours ago
FYI - that was only 1 yr 7 months ago, only about half way to a few years back
personalityson • 10 hours ago
I can't phantom they haven't made an app for Android TV yet
jamiek88 • 8 hours ago
Fathom.
Malazath • 3 hours ago
Hey, at least you know they're a real person.
j45 • 14 hours ago
This is really well done as a different take, if the channel number listed the name of the channel and show it would be nice
huhkerrf • 12 hours ago
You can change the settings to have it shown.
MinimalAction • 10 hours ago
This is mindblowingly beautiful! Thanks for making this. Many a times, I open YouTube, get overwhelmed by repeated recommendations that I had already decided not to watch, and eventually close without watching much. Now that this site puts it into 40 different genres, I can decide which one am I in the mood for and keep surfing to others if I don't feel like it! Brilliant app.
rconti • 10 hours ago
Tip: Skip recommendations and just go to your subscriptions page.
jamiek88 • 8 hours ago
Good advice! I’ve literally never consciously looked at that recommendation page thus avoid shorts mostly too.
(I couldn’t be trusted with TikTok so I have to be careful with shorts etc).

With TikTok I avoided it for years then one week when sick I installed it and within a couple hours it had an algorithm for me that was crazy addictive.

I started messing with it and looked up and 4 hours had gone by and it felt like minutes.

Severe ADHD and short form video do not mix.

Minor49er • 16 hours ago
This reminds me of a similar project called Hypertext.tv, but instead of YouTube videos, it shows websites. It's an interesting take on channel surfing since each airing is interactive
http://hypertext.tv

jasondigitized • 12 hours ago
I built something similar but for podcasts. Swipe up and jump into the middle of a podcast like tuning a radio. https://apps.apple.com/us/app/stumblecast/id6758248417
spicyusername • 15 hours ago
The StumbleUpon days were a truly magical time on the internet.
indigodaddy • 15 hours ago
Worker limit exceeded. Dang even comments get HNed
Guestmodinfo • 15 hours ago
Thank you so much. Enriching
Animats • 4 hours ago
This should be marketed to hospitals, retirement homes, gyms, and such. Connect it to a remote with just channel up, channel down, volume up, and volume down.
This would definitely be useful for gyms. My gym has a tier of basic cable so low that their current programming is mostly a choice of "Walker, Texas Ranger", old episodes of "NCIS", Fox News, K-pop, or the Jewelry Channel.

cedws • 14 hours ago
I really like this. Often I just want to watch something but YouTube insidiously steers me towards doom videos, even after clearing cookies. I like that this bypasses the algorithm and lets me just watch stuff, and if there's nothing interesting playing, I can just go do something more productive.
bentt • 13 hours ago
I love this. At a glance, here are some dynamics this reveals:
1. You can share a channel with a friend and know that they see the same thing as you. What's on at 5:03pm on channel 4 is the same for everyone.

2. The decision of what to watch is topical and greatly simplified. It extracts the decisions from "the algorithm" and gives you agency again.

3. There's a lot of stuff you never see on Youtube's recommendations because the algorithm doesn't show you those videos. Ever.

skyberrys • 14 hours ago
It took me a minute to realize you are recreating the cable menu too. It's a nostalgic hit. All it's missing is a chunky remote and annoying siblings to fight with.
lt_kernelpanic • 12 hours ago
Annoying siblings are available on the Pro plan, I believe.
commandlinefan • 13 hours ago
> a very first-world problem
Actually I really wish this had existed while my father was still alive! Toward the end of his life, he had developed pretty debilitating Alzheimers, but he still liked to watch TV. The problem was, modern TVs were way too complex for him to use. My mom had to come in the room and put on DVDs for him pretty much all day. I'm sure he could have figured out how to channel surf by himself if that had been an option.

ebbi • 9 hours ago
This is so good! Have you done something with the sound as well? I swear that also sounds very 'cable-y' somehow but can't really describe it. Or maybe it's just one of those mind games induced by those CRT lines...
realityfactchex • 16 hours ago
Original HN post 2 days prior (0 traction then): https://news.ycombinator.com/item?id=47336100
Recent media coverage:

https://techcrunch.com/2026/03/12/channel-surfer-watch-youtu...

https://www.theverge.com/tech/893598/this-is-immediately-my-...

https://www.engadget.com/entertainment/youtube/this-web-app-...

https://hackaday.com/2025/10/17/channel-surfing-nostalgia-ma...

dang • 15 hours ago
Thanks! When there was a recent Show HN we usually merge the comments thither and re-up that post. I'll do that now.
Normally I'd leave your comment in the original thread as a pointer, but since the other links are of interest, I've moved it too.

(the other thread was https://news.ycombinator.com/item?id=47366400)

epiccoleman • 16 hours ago
This is super cool, I love the aesthetic. The biggest thing I want out of something like this is curation (and it seems like there's at least some degree of that happening here among the various categories).
hexage1814 • 13 hours ago
It reminds me of this project, that used old clips from the 1970s, 1980s, 1990s, to create a TV-like experience from back in the day:
https://70s.myretrotvs.com/

morb • 11 hours ago
As others have noticed, this is similar to ytch.xyz.
What ytch does better is that it is mostly keyboard navigable (with minor annoyances), which also makes it usable with a remote control, unlike this.

I actually do use ytch (alongside Kodi and YT Leanback mode) on my Raspberry Pi HTPC that is controlled by remote only. Works fine. Chromium, kiosk mode, entry in ~/.local/share/applications/ytch.desktop, and you're good to go.

I guess you could use this with a remote if your remote can emulate mouse, mine doesn't. Mine is just some old otherwise useless remote recycled from the junk drawer, and made useful again by a cheap IR receiver diode from Amazon.

I'm not too crazy about the UI of Channel Surfer in general, but others have noted that it reminds them of cable services they used, I guess that was the goal.

I'll check out Channel Surfer in a few months. I wish you luck and lots of users :)

nomel • 10 hours ago
press the little "Press: ?" for mapping:
    Arrow Up / Down: Change channel
    G: Toggle guide
    M: Mute
    I: Import channels
    ?: This menu
    Esc: Close modal
darkstar999 • 10 hours ago
These are great! I wish I could use them on Roku or Android tv.
downsplat • 16 hours ago
Why would you want to do that? I'm so happy I can search exactly what I want among heaps of long tail stuff, I would never want to go back to a "live tv" interaction model.
madrox • 15 hours ago
Not the author, but did a LOT of research on this during my time at Disney while working on Disney+ prior to its launch.
This is, effectively, no different than a carousel of algorithm-recommended content. However, UX studies have found users reluctant to watch something recommended to them. It requires making an affirmative decision on time investment. Most people have the experience of a friend recommending a movie or book and still being reluctant to dive in.

The problem is very similar to dating apps, if you think about it. This is why Tinder's innovation on "swipe left/right" took off the way it did. In UX terms it's better to drop users into something and make the cognitive effort be choosing to get out of it rather than choosing to get into it. It's a big part of why TikTok works.

The reason this isn't more common in video apps has more to do with UX norms at this point. Another important thing I learned about streaming at Disney was that no one really cares how innovative the browsing experience is. They just want to watch Frozen. They're used to carousels now, and they're easy to program. This, I think, speaks more to your sensibilities.

downsplat • 13 hours ago
I guess it's really not for me though. First thing I do is turn autoplay off, and I'd refuse to use a service that doesn't give me that option. OTOH, I do sometimes find it fun to hunt for good stuff among the recommendations.
j45 • 14 hours ago
Tuning into a channel in channel surfing mode also lets you hop in mid story which is it's own experience.
epiccoleman • 16 hours ago
Sometimes, it's nice to just sit down and watch something without needing to make repeated decisions about what's on.
I typically share your mindset, but I can see the appeal. There was something nice about the TV that just, ya know, already had something going when you turned it on. I spent many happy evenings in hazy basement rooms enjoying whatever Adult Swim decided was going to be on the TV that night.

ecliptik • 16 hours ago
I miss this too, and sort of get it on airplanes where I almost never use my seat back screen and end up watching someone else's instead (yes there's no sound).
I chalk it up to overwhelming choices. Sometimes I just want to watch something but don't want to go through dozens of options and having decision anxiety.

Bonus is sometimes I discover something I never thought I would have liked.

epiccoleman • 15 hours ago
> I chalk it up to overwhelming choices. Sometimes I just want to watch something but don't want to go through dozens of options and having decision anxiety.
This is by far the biggest annoyance with modern TV for me. If I've already decided on something I want to watch, it's obviously great to just be able to navigate to it and put it on on my schedule, to pause it, have no ads, etc.

But sometimes, for better or worse, I just want to plunk down on the couch and turn my brain off, and if I'm in that mode the last thing I want to do is try to find something worth watching on my own steam.

Like, Youtube is great! Yeah, there's a ton of crap, but there's so much on there that would entertain me and be a guilt-free, even edifying use of me time. But having to choose something new every 10-20 minutes? Actively managing a queue while watching stuff? That's - pardon my French - for the birds.

zoklet-enjoyer • 16 hours ago
I was getting my hair cut the other day and one of the guys at the barbershop was talking about how his wife bought a radio and it's nice to just have NPR going all the time instead of searching for a podcast or playlist. I love radio too but haven't listened much outside of my car since 2019. Back then I had a different work schedule and would regularly tune in to Science Friday and just have the radio going much of the day. Since 2019, I've moved 4 times, had roommates most of that time who wouldn't want the radio playing all day, and just never fully unpacked and haven't set up my stereo system. Mostly I've listened to podcasts on my phone and a Bluetooth speaker or earbuds. Radio is nice, I like it better than TV because it's less distracting to me. Those moving pictures mesmerize me and I find it difficult to look away, which was why I didn't even have a TV for half my adult life.
socalgal2 • 15 hours ago
> it's nice to just have NPR going all the time
I used to do that but the shows repeat and at the top of the hour or sometimes multiple times they repeat the same news over and over. I get someone else might be tuning in and not have heard the latest news

Maybe there's some middle ground where instead of a stream it's on demand but continuous. So I go to videostream.npr.com and since it knows it's a single user it can push the news once and then just be shows.

That said, youtube autoplay is the basic concept, it just sucks at what it recommends.

epiccoleman • 15 hours ago
I like that idea, almost like a prioritized queue of content - show me the stuff I'm sure to want to see first, and then just gimme whatever. In the context of NPR, the "stuff I'm sure to want to see" is probably just "the news." But maybe other platforms / distribution channels would have a more specific notion of what deserves my attention first.
I guess this is basically how TV worked in the pre-streaming days - the new episode of whatever hot series aired during the prime time slot, and lesser slots were filled with reruns / resyndicated stuff.

joegahona • 15 hours ago
I prefer searching too, but sometimes it's nice to just "put TV on." I do this now with Amazon Prime Video, which has a "Live" feature that mimics a guide akin to Channel Surfer. Also my dad (age 85) struggles with Youtube on our TV because of the decision paralysis.
edgarvaldes • 15 hours ago
For me, the best solution is a mixed one. My Plex has a curated list of tv shows and movies. Then I have Tunarr for "live" channels from own my selection. Best of both worlds.
majorchord • 10 hours ago
Why would you go eat at a restaurant? I'm so happy I can cook anything I want at home, exactly how I want it, instead of choosing from a set menu made by someone else.
/s in case it's not obvious

Bukhmanizer • 15 hours ago
For me it’s that usually I can figure out if I’m going to like something way more easily if I’m just clicking through and watching samples of a show. I don’t want to be constrained to a predetermined algorithmic category.
wonger_ • 15 hours ago
Decision fatigue
Fricken • 15 hours ago
Sometimes I just want to know "what is popular on youtube right now? What is it that the world is watching?" and Youtube won't tell me anymore. The algorithm isolates me and my preferences from consensus reality. Youtube doesn't want me coming out of my cave.
sublinear • 14 hours ago
The (forced) decision fatigue and constant interruptions makes YouTube a miserable experience.
Good: I choose to when and what to change the channel to. The channel never stops.

Bad: YouTube video ends and I'm prompted to do something every 5 to 15 mins and even autoplay chooses to show me content from another channel.

jimt1234 • 15 hours ago
For me it's just nostalgia. Back when I was a teen in the 80s, we turned on MTV and just left it there, all day, letting them tell us what was cool.
holysoles • 14 hours ago
I'll plug a similar project that I found last week, its an emulated TV Tuner (HD Homerun) of your Plex/Jellyfin content. Its great having an easy option to throw something on for background noise.
https://tunarr.com/

moduspol • 15 hours ago
This is the kind of thing I used to tell myself that I needed to exist before I'd be able to drop cable. The ability to just mindlessly turn on the TV and drop yourself right into the middle of something and leave it on throughout the day was... habit-forming, I guess.
Though ultimately it was not that difficult of a habit to drop.

ElijahLynn • 14 hours ago
My first impulse was when pressing the channels that it wasn't working. I then realized I had to hold down my thumb for it to then give me a prompt to tune to the channel. That user experience needs to be improved.
Other than that, this totally fits the nostalgia of old school cable channel surfing!

Well done!

kilroy123 • 14 hours ago
You have to tap on the channels on the left.
ElijahLynn • 14 hours ago
Ah, yes, that works, thank you. Was not obvious.
thebiblelover7 • 16 hours ago
I like the idea of everyone getting fed the same content. But I also especially love being able to discover new videos and channels that are hopefully curated by humans.
It might be better to just turn this on when I'm wanting to watch something than open YouTube and look at my homepage.

kilroy123 • 15 hours ago
I'm the creator of this. It is human curated. :-) Actually, there's zero AI with this one.
thebiblelover7 • 15 hours ago
Just curious, how are you curating it? Are you finding videos and adding them to the respective channels? or are you adding entire YT accounts to specific channels
kilroy123 • 15 hours ago
I add channels and playlists.
ranger_danger • 10 hours ago
Is the source code available?
jader201 • 14 hours ago
I wonder how cool it would be to have a live ephemeral chat for each channel?
One thing I love(d) about live TV (or even live radio) was the community around knowing other people were watching the exact same thing I was watching (and then the watercooler chat around it afterwards).

If there was live chat attached to each of these "stations", it could spark some interesting chatter/community.

I know this already exists OOTB with YouTube Live, FB Live, etc.

But this would be for things that were simply uploaded, and now streamed live like you're doing here.

Obviously, that only works if there's enough viewership/participation.

gerjomarty • 14 hours ago
This reminded me of Ersatz TV [1], which on checking appears to have gone into maintenance mode a few weeks ago.
I had wanted to use something that lets me set up an EPG with all of the YouTube channels I watch, to see their live streams in a TV guide and see their upcoming streams in a nice grid format. It's probably harder to do this with live stuff than it is to have a set of videos like this site uses.

[1]: https://github.com/ErsatzTV/ErsatzTV

dml2135 • 10 hours ago
Ah, disappointing, I was planning to set this up at some point soon.
Anyone know of good alternatives for setting up your own iptv channels?

airstrike • 12 hours ago
Shameless plug but I think this shares a lot of the same reasons why I built this time-traveling radio: https://anthrology.site/
There's something to be said about tuning into some program that is already "on", instead of requiring on-demand decision about what to watch (or listen to!)

hallux • 9 hours ago
I love this. I miss TV from my youth. I often work on our sofa and just have something on our TV from YouTube. This will be the perfect thing to have in the background instead of YT recommendations. I'm gonna put this on now and take a nap.
noah_buddy • 13 hours ago
I love this concept. I was recently thinking about how I used to be able to skip from one channel to another when an ad break came on. I would love the harness on a smart device to be like this so that I may switch between the Hulu and Netflix apps at will. Why should I have to restart the app each time I navigate in? Why do the apps even know that I am switching around?
ahnick • 10 hours ago
Classic incentive misalignment for us plebs. The platforms want(need?) their advertising revenue.
bityard • 15 hours ago
Ah, it's interesting but if you really want the cable TV experience, there is pluto.tv which works in a browser, and is generally installed on most streaming boxes/sticks/TVs.
Does this avoid YouTube ads or pass them through? I somewhat wonder if this kind of thing is the reason that YouTube wants to progressively lock down their platform. (They don't want users avoiding their algorithms and their ads.)

that_lurker • 15 hours ago
”Pluto TV is not available in your location.” :-(
starkeeper • 13 hours ago
This is so weird because yesterday, or the day before I was trying to think of some sample code to work on, and I did want to simulate a TV set with youtube. Not exactly like yours, no channel guide, but the basics and I think there is a weird reason besides inside knowledge why prediction markets "work"!!
Looks great!

elbac • 15 hours ago
I love how 'Music 80s' is channel 29, which was MTV on cable when I was growing up in the tri-state area in the 80s ;)
feerfreeflight • 11 hours ago
Great work! I had wanted to do something like this for all the Star Trek series’ back when Netflix US had them up but never got around to it. Great to see a similar thought with a much cooler implementation.
ekjhgkejhgk • 13 hours ago
There's a nice interview with Stallman where he's asked about this: what are people's motivation for contributing to Free software.
https://youtu.be/ucXYWG0vqqk?t=1889

I find him speaking really soothing.

smusamashah • 11 hours ago
It says "Subscribe to unlock channel import. Get weekly weird sites delivered to your inbox. Free forever.".
> Quickly import your subscriptions in the browser via a bookmarklet

I don't see any mention of bookmarklet anywhere on the page

stbtrax • 6 hours ago
I love it. This is so much better for finding random things to watch than the algo
fallinditch • 12 hours ago
I want to automate a feed of text summaries of videos from YouTube channels and playlists, and then fetch full transcripts of the ones that interest me.
Any idea if this is possible without having to query the YouTube API?

devrundown • 10 hours ago
This would be amazing to be able to use on a TV with a remote!
BatmansMom • 12 hours ago
Would love a way to get this on my tv! Casting from a browser would be too much
VikingCoder • 13 hours ago
Also reminds me of Bob Dylan's "How Does It Feel" website:
https://video.bobdylan.com/

Which has folks from The History channel, Pawn Stars, etc

jondwillis • 11 hours ago
Literally Pluto TV v1 à la 2013/14.
Source: me. I built it with some folks.

acuozzo • 4 hours ago
How much did you wind up walking away with?
apetresc • 7 hours ago
If this was an Apple TV app, I think it would be the default mode in my household.
numbers • 13 hours ago
I want something like this for Plex, where I can just turn it on and have some of my favorite shows play random episodes, and I wish Plex made that easy to do.
mpeg • 15 hours ago
A similar site used to exist that had really high quality curated content called neverthink, it was acquired in 2021 and eventually killed but I always thought it was a great idea.
mattas • 14 hours ago
My initial reaction to the headline was, "cable TV is terrible, why would anyone want to watch YouTube like it's cable?!" But I actually love this!
kmoser • 10 hours ago
Clicking any of the videos/channels doesn't cause the videos to play. What am I missing?
redbell • 15 hours ago
Similar project: https://news.ycombinator.com/item?id=41247023
alejoar • 15 hours ago
Ha, this is amazing. We need a version for Android TV!
janpio • 11 hours ago
I would instantly install and sometimes choose this over the Youtube app.
surajcm • 15 hours ago
+1
ngokevin • 12 hours ago
I'd love an Inter-dimensional Cable channel, just weird surreal stuff
ProllyInfamous • 12 hours ago
Best I can do:
<https://old.reddit.com/r/InterdimensionalCable/top/?sort=top...>

e.g: <https://youtu.be/qCJJbo8cvzI?si=ivsYh9QviAIpj5GB> [probably NSFW "Tifa Lockhart Show You Her Worms" it'd be so difficult to explain...]

----

See also <http://www.ytch.tv>, made by a fellow /hn/er.

Comparing the two, his channel selection is much more diverse, but your layout is much more informative (e.g. old "channel guide" overlay).

fitzroymckay • 13 hours ago
Similar to the ytch.xyz project
anthonySs • 9 hours ago
not super mobile friendly (as i’d imagine for an app made for tvs) but amazing aesthetic nonetheless
TheSkyHasEyes • 16 hours ago
Any way to toggle full screen?
BizarroLand • 10 hours ago
No full screen, but you can minimize the channel interface so that it's nearly full screen.
clintonc • 13 hours ago
I love this. Thank you.
DANmode • 3 hours ago
Interested in making a broader version of this that supports your Netflix/Paramount/HBO titles?
This + that was what my dad asked me for last week.

…and he’d be willing to pay for the luxury!

Just wants to flip up and down between stuff he has a chance of wanting to be seeing.

I wouldn’t mind working on that, if someone else was into it, too!

iamspoilt • 13 hours ago
Is there an app for this I can download on my Apple TV?
themagician • 10 hours ago
I would 100% pay for this, as long as it let me login with my YouTube account to remove the ads.
wonger_ • 15 hours ago
See also https://ytch.tv/
flats • 15 hours ago
Came here for this, thank you. I knew I’d seen this sort of thing before.
Curation feels better with this implementation?

webofunni • 15 hours ago
Good one. Why youtube is not playing any ad in these sites?
techteach00 • 14 hours ago
I really like this. Old formats are comforting.
ares623 • 10 hours ago
Can I create and curate my own channels?
thomastraum • 12 hours ago
made this when youtube api dropped around 2007 in flash. was called TraumTV
naxtsass • 15 hours ago
This is a really interesting idea.
sublinear • 13 hours ago
Have any plans to release the source?
pwr1 • 16 hours ago
Love it, but when I clicked another show in the guide, nothing happened.
glouwbug • 12 hours ago
Need a DVR for that (and a couple hours)
shellfishgene • 16 hours ago
You have to click on the channel number in the first column.
zoklet-enjoyer • 16 hours ago
You need to click on the channel number. Clicking in the title of the show doesn't do anything.
pwr1 • 16 hours ago
Ahh, now I see it. So cool! Bookmarked.
cryptozeus • 14 hours ago
this is so good ! Great idea, not going to use it a lot but great concept
uean • 11 hours ago
I just love it. This calms me in a way I can't put my finger on... something about not needing to endless scroll and choose based off a thumbnail and endure an intro and like-and-subscribe please. It's just there. It removes a bunch of stress.
rusakov-field • 16 hours ago
That is really creative.
Imustaskforhelp • 10 hours ago
I feel like this can be useful for kids if you can add some genuinely nice cartoon shows from Youtube. I remember my childhood was filled with adventure time, regular show etc. and Cartoon Network and there are many decent cartoons.
And if you do this, please add 3 cartoon channels just for an option of 3 for kids. Because I remember that it was 3 cartoon channels for me but mostly Cartoon Network, Some disney xd and an niche cartoon channel that I used to watch by. Maybe even have it between Anime (Shinchan/Doraemon/Kitretsu) and Normal animations (Avengers/Spiderman etc.) and Cartoon Network (Regular Show/Adventure Time/Steven Universe)

But the reason why I discovered it and why I feel like young kids nowadays can't find is that I used to go to my TV after coming from school and watch these nice shows for example, whereas now its all youtube.

So in a way, your website can help kids and also parents to better help moderate what their kids watch.

Also even aside from kids, this is something really cool in it of itself that I imagine myself using as well :) Nice project! I just hope that if possible you can add something so that kids could watch it too maybe as well as I find it to be nice possibility to add

I am also curious how you curate the Content for Cable TV in the first place.

Edit: But once again, I want to say that this is a project that I want to use for myself too for these channels as I also go through the same problem where I get the problem of too much choices and overstimulus and feeling of overwhelm.

VikingCoder • 13 hours ago
Now make it a Roku app!!! :D
alldayhaterdude • 14 hours ago
THis rules
Barbing • 15 hours ago
When yesterday I wondered the best approach to keeping slop off elderly seniors' feeds, I suppose the universe heard me. Thank you!
poisonarena • 14 hours ago
i want to be try this but I am unable to import my subscriptions like the directions you give, it just brigns me to the my feed when i follow your directions
kilroy123 • 13 hours ago
When you get to your feed, you have to click the bookmarklet. It will pull your videos and copy them to your clipboard.
rohan_joshi • 11 hours ago
so cool
Unlock Modern Pro
More awesome features...
