import React from 'react'
import PropTypes from 'prop-types'
import { SocialIcons } from '../elements/SocialIcons'
import Linked from '../elements/Linked';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


export const blackButtonClassName = "inline-block my-2 bg-primary px-4 text-white text-sm py-2 font-thin rounded hover:text-secondary hover:bg-white transition-bg duration-500"

export const linksToOtherKatch = [
    {
        linkTo: "https://katchcommunications.com",
        text: "VISIT KATCH LONDON"
    },
    {
        linkTo: "https://www.wearetheunderdog.com/",
        text: "VISIT THE UNDERDOG"
    },
    {
        linkTo: "https://katchdisruption.com/",
        text: "VISIT KATCH DISRUPTION"
    },
]


const Footer = props => {

    return (
        <footer className="py-12 bg-secondary ">
            <div className="max-w-screen-xl mx-auto md:grid grid-cols-3 lg:grid-cols-4 sm:px-12 px-4 space-y-4 md:space-y-0">

                <div className="col-span-1 h-full w-full">
                    <h4
                        className="mb-4  font-medium px-0 pt-0 pb-2 m-0 text-lg  leading-4 text-gray-800"
                    >
                        WE LIKE TO BE FOLLOWED
                </h4>
                    <SocialIcons
                        className="text-white space-y-2 mb-4 "
                        showText
                        icons={[
                            {
                                icon: faFacebookF,
                                linkTo: "https://www.facebook.com/KatchInternational",
                                text: "Follow our Facebook"
                            },
                            {
                                icon: faTwitter,
                                linkTo: "https://twitter.com/katchbabs",
                                text: "Follow our Twitter"
                            },
                            {
                                icon: faInstagram,
                                linkTo: "https://www.instagram.com/katch_int/",
                                text: "Follow our Instagram"
                            },
                        ]} />


                    {linksToOtherKatch.map(link => <div key={link.linkTo}>
                        <Linked

                            className={`${blackButtonClassName}`}
                            linkTo={link.linkTo}
                        >
                            {link.text}
                        </Linked>
                    </div>)}
                </div>
                <div className="col-span-1 md:col-span-2 space-y-4">
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4">
                        <iframe
                            loading="lazy"
                            title="Google map Showing the location of the Dubai office"
                            className="w-full md:w-2/5 xl:w-1/2"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.0699643501157!2d55.17498211546862!3d25.099492883941732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b7747548917%3A0xe3bfb5f0bd4ed25!2sTameem+House+Office+Building+-+C008-014+-+Dubai!5e0!3m2!1sen!2sae!4v1546959312230" style={{ border: 0 }}
                            allowFullScreen={false}
                            height="180"
                            frameBorder="0"
                        />
                        <div className="flex flex-col justify-center">
                            <h4>Dubai Branch</h4>
                            <div className="text-sm text-white space-y-1">
                                <p >Address 2004, Tameem House,</p>
                                <p>Barsha Heights, P.O.Box 122321</p>
                                <p>Dubai UAE</p>
                                <p>TEL : +971 4 243 8577</p>
                                <p>Email: info@katchthis.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4">
                        <iframe
                            loading="lazy"
                            title="Google map Showing the location of the London office"
                            className="w-full md:w-2/5 xl:w-1/2"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.7603197930894!2d-0.19218698391436734!3d51.4625568796278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760f7d25836479%3A0x639f26cdf488c91c!2sBluewater+House%2C+Smugglers+Way%2C+London+SW18+1ED%2C+UK!5e0!3m2!1sen!2sae!4v1546959768918" style={{ border: 0 }}
                            allowFullScreen={false}
                            height="180"
                            frameBorder="0"
                        />
                        <div className="flex flex-col justify-center">
                            <h4>London Branch</h4>
                            <div className="text-sm text-white space-y-1">
                                <p >21-23 Mossop Street</p>
                                <p> London, SW3 2LY</p>
                                <p>TEL: +44 20 8895 6383</p>
                                <p>Email: info@katchthis.com</p>
                                <p>Website: www.katchcommunications.com</p>
                            </div>

                        </div>

                    </div>

                </div>
                <div className="max-w-lg col-span-3 lg:col-span-1 mx-auto pt-8 lg:pt-0">
                    <h4
                        className="mb-4  font-medium px-0 pt-0 pb-2 m-0 text-lg  leading-4 text-gray-800"
                    >
                        KATCH US
                    </h4>
                    <p className="text-white text-sm">
                        Job inquiries may be sent directly to <a className="text-gray-200" href="mailTo:recruitment@katchthis.com">recruitment@katchthis.com</a>. All job inquiries sent through this form will be rejected.
                    </p>
                    <form
                        className="w-full space-y-3 mt-4"
                        action="">
                        <input className="w-full" type="text" name="name" placeholder="Name" />
                        <input className="w-full" type="text" name="phone" placeholder="Mobile" />
                        <input className="w-full" type="email" name="email" placeholder="Email address" />
                        <textarea className="w-full" placeholder="Message" rows="4"></textarea>
                        <button type="submit" className="bg-white text-secondary hover:bg-black hover:text-white transition-bg duration-500 px-4 py-2">Submit</button>
                    </form>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto flex justify-between mt-4 px-4">
                <h5 className="mt-2 font-thin opacity-75 text-white text-sm ">&copy; Katch International {new Date().getFullYear()}</h5>
                <h6 className="text-xs font-thin mt-2 opacity-50 text-right ml-auto text-white hover:opacity-100"><Linked linkTo="https://antler.digital">Built by Antler Digital</Linked></h6>
            </div>
        </footer >
    )
}

Footer.propTypes = {

}

export default Footer
