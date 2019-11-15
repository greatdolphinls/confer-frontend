import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(8),
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4)
      }
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(1)
      }
    },
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        fontSize: 36
      }
    },
    mainDescription: {
      fontSize: 16,
      marginBottom: theme.spacing(1.5),
      [theme.breakpoints.down('xs')]: {
        fontSize: 14
      }
    },
    containerTitle: {
      fontSize: 22,
      fontFamily: 'Moret-Bold',
      marginBottom: theme.spacing(1.5),
      [theme.breakpoints.down('xs')]: {
        fontSize: 18
      }
    },
    subTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: theme.spacing(1.5),
      [theme.breakpoints.down('xs')]: {
        fontSize: 12
      }
    }
  };
};

const PrivacyPolicy = ({ classes }) => {

  const headerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.mainDescription}>
          Thank you for choosing to be part of our community
          at Gratitude Software, Inc., doing business as Merit
          (“<b>Merit</b>”, “<b>we</b>”, “<b>us</b>”, or “<b>our</b>”).
          We are committed to protecting your personal information
          and your right to privacy. If you have any questions
          or concerns about our policy, or our practices with
          regards to your personal information, please contact
          us at contact@hellomerit.com.
        </Typography>
        <Typography className={classes.mainDescription}>
          When you visit our website http://hellomerit.com, and use
          our services, you trust us with your personal information.
          We take your privacy very seriously. In this privacy policy,
          we seek to explain to you in the clearest way possible what
          information we collect, how we use it and what rights you
          have in relation to it. We hope you take some time to read
          through it carefully, as it is important. If there are any
          terms in this privacy policy that you do not agree with,
          please discontinue use of our Sites and our services.
        </Typography>
        <Typography className={classes.mainDescription}>
          This privacy policy applies to all information collected
          through our website (such as http://hellomerit.com), and/or
          any related services, sales, marketing or events (we refer
          to them collectively in this privacy policy as the <b>"Services"</b>).
        </Typography>
        <Typography className={classes.mainDescription}>
          <b>
            Please read this privacy policy carefully as it will help
            you make informed decisions about sharing your personal
            information with us.
          </b>
        </Typography>
      </div>
    )
  }

  const oneContainerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.containerTitle}>
          1. WHAT INFORMATION DO WE COLLECT?
        </Typography>
        <div className={classes.container}>
          <Typography className={classes.subTitle}>
            Personal information you disclose to us
          </Typography>
          <Typography className={classes.mainDescription}>
            <i><b>In Short:</b> We collect personal information that
            you provide to us such as name, address, contact information,
          passwords and security data, and payment information.</i>
          </Typography>
          <Typography className={classes.mainDescription}>
            We collect personal information that you voluntarily provide
            to us when registering at the Services expressing an interest
            in obtaining information about us or our products and services,
            when participating in activities on the Services (such as posting
            messages in our online forums or entering competitions, contests
            or giveaways) or otherwise contacting us.
          </Typography>
          <Typography className={classes.mainDescription}>
            The personal information that we collect depends on the context
            of your interactions with us and the Services, the choices you
            make and the products and features you use. The personal information
            we collect can include the following:
          </Typography>
          <Typography className={classes.mainDescription}>
            <b>Publicly Available Personal Information.</b> We collect first name,
            maiden name, last name, nickname, email addresses, business email,
            social media, and other similar data.
          </Typography>
          <Typography className={classes.mainDescription}>
            <b>Personal Information Provided by You.</b> We collect CV and other
            job application data such as background checks, work performance,
            salary, bonuses, disciplinary actions, and other similar data.
          </Typography>
          <Typography className={classes.mainDescription}>
            <b>Credentials.</b> We collect passwords, password hints, and
            similar security information used for authentication and account access.
          </Typography>
          <Typography className={classes.mainDescription}>
            All personal information that you provide to us must be true,
            complete and accurate, and you must notify us of any changes
            to such personal information.
          </Typography>
        </div>

        <div className={classes.container}>
          <Typography className={classes.subTitle}>
            Information automatically collected
          </Typography>
          <Typography className={classes.mainDescription}>
            <i><b>In Short:</b> Some information – such as IP address and/or
            browser and device characteristics – is collected automatically
            when you visit our Services.</i>
          </Typography>
          <Typography className={classes.mainDescription}>
            We automatically collect certain information when you visit,
            use or navigate the Services. This information does not reveal
            your specific identity (like your name or contact information)
            but may include device and usage information, such as your IP address,
            browser and device characteristics, operating system, language preferences,
            referring URLs, device name, country, location, information about how and
            when you use our Services and other technical information. This information
            is primarily needed to maintain the security and operation of our Services,
            and for our internal analytics and reporting purposes.
          </Typography>
          <Typography className={classes.mainDescription}>
            Like many businesses, we also collect information through cookies
            and similar technologies.
          </Typography>
          <Typography className={classes.mainDescription}>
            <b>Online Identifiers.</b> We collect devices, cookie identifiers, or
            others such as the ones used for analytics and marketing, tools and
            protocols, such as IP (Internet Protocol) addresses, and other similar data.
          </Typography>
        </div>

        <div className={classes.container}>
          <Typography className={classes.subTitle}>
            Information collected from other sources
          </Typography>
          <Typography className={classes.mainDescription}>
            <i><b>In Short:</b> We may collect limited data from public databases,
            marketing partners, and other outside sources.</i>
          </Typography>
          <Typography className={classes.mainDescription}>
            We may obtain information about you from other sources, such as public
            databases, joint marketing partners, as well as from other third parties.
            Examples of the information we receive from other sources include: social
            media profile information; <b>marketing leads and search results and links,
            including paid listings (such as sponsored links). We will inform you about
            the source of information and the type of information we have collected
            about you within a reasonable period after obtaining the personal data,
            but at the latest within one month.</b>
          </Typography>
        </div>
      </div>
    )
  }

  const twoContainerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.containerTitle}>
          2. HOW DO WE USE YOUR INFORMATION?
        </Typography>

        <div className={classes.container}>
          <Typography className={classes.mainDescription}>
            <i><b>In Short:</b> We process your information for purposes based
            on legitimate business interests, the fulfillment of our contract
            with you, compliance with our legal obligations, and/or your consent.</i>
          </Typography>
          <Typography className={classes.mainDescription}>
            We use personal information collected via our Services for a variety
            of business purposes described below. We process your personal information
            for these purposes in reliance on our legitimate business interests,
            in order to enter into or perform a contract with you, with your consent,
            and/or for compliance with our legal obligations. We indicate the specific
            processing grounds we rely on next to each purpose listed below.
          </Typography>
        </div>

        <div className={classes.container}>
          <Typography className={classes.mainDescription}>
            We use the information we collect or receive:
          </Typography>
          <ul>
            <li>
              <Typography className={classes.mainDescription}>
                <b>To facilitate account creation and logon process.</b> If you choose
                to link your account with us to a third party account (such as your Google
                or Facebook account), we use the information you allowed us to collect
                from those third parties to facilitate account creation and logon process
                for the performance of the contract.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>To send you marketing and promotional communications.</b> We and/or our
                third party marketing partners may use the personal information you send
                to us for our marketing purposes, if this is in accordance with your marketing
                preferences. You can opt-out of our marketing emails at any time (see the
                "<u>WHAT ARE YOUR PRIVACY RIGHTS</u>" below).
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>To send administrative information to you.</b> We may use your personal
                information to send you product, service and new feature information and/or
                information about changes to our terms, conditions, and policies.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>Request Feedback.</b> We may use your information to request feedback and
                to contact you about your use of our Services.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>To enable user-to-user communications.</b> We may use your information
                in order to enable user-to-user communications with each user's consent.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>To enforce our terms, conditions and policies for Business Purposes,
                  Legal Reasons and Contractual.</b>
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>To respond to legal requests and prevent harm.</b> If we receive a
                subpoena or other legal request, we may need to inspect the data we hold
                to determine how to respond.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>To manage user accounts.</b> We may use your information for the purposes
                of managing our account and keeping it in working order.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>To deliver services to the user.</b> We may use your information to provide
                you with the requested service.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>To respond to user inquiries/offer support to users.</b> We may use your
                information to respond to your inquiries and solve any potential issues you
                might have with the use of our Services.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>For other Business Purposes.</b> We may use your information for other Business
                Purposes, such as data analysis, identifying usage trends, determining the
                effectiveness of our promotional campaigns and to evaluate and improve our Services,
                products, marketing and your experience. We may use and store this information in
                aggregated and anonymized form so that it is not associated with individual end users
                and does not include personal information. We will not use identifiable personal
                information without your consent.
              </Typography>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  const threeContainerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.containerTitle}>
          3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
        </Typography>

        <div className={classes.container}>
          <Typography className={classes.mainDescription}>
            <i><b>In Short:</b> We only share information with your consent, to comply
            with laws, to provide you with services, to protect your rights, or to
            fulfill business obligations.</i>
          </Typography>
        </div>

        <div className={classes.container}>
          <Typography className={classes.mainDescription}>
            We may process or share data based on the following legal basis:
          </Typography>
          <ul>
            <li>
              <Typography className={classes.mainDescription}>
                <b>Consent:</b> We may process your data if you have given us specific consent
                to use your personal information in a specific purpose.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>Legitimate Interests:</b> We may process your data when it is reasonably
                necessary to achieve our legitimate business interests.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>Performance of a Contract:</b> Where we have entered into a contract with you,
                we may process your personal information to fullfill the terms of our contract.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>Legal Obligations:</b> We may disclose your information where we are legally
                required to do so in order to comply with applicable law, governmental requests,
                a judicial proceeding, court order, or legal process, such as in response to a
                court order or a subpoena (including in response to public authorities to meet
                national security or law enforcement requirements).
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>Vital Interests:</b> We may disclose your information where we believe it is
                necessary to investigate, prevent, or take action regarding potential violations
                of our policies, suspected fraud, situations involving potential threats to the
                safety of any person and illegal activities, or as evidence in litigation in which
                we are involved.
              </Typography>
            </li>
          </ul>

          <Typography className={classes.mainDescription}>
            More specifically, we may need to process your data or share your personal information
            in the following situations:
          </Typography>
          <ul>
            <li>
              <Typography className={classes.mainDescription}>
                <b>Vendors, Consultants and Other Third-Party Service Providers.</b> We may share your
                data with third party vendors, service providers, contractors or agents who perform
                services for us or on our behalf and require access to such information to do that work.
                Examples include: payment processing, data analysis, email delivery, hosting services,
                customer service and marketing efforts. We may allow selected third parties to use
                tracking technology on the Services, which will enable them to collect data about how
                you interact with the Services over time. This information may be used to, among other
                things, analyze and track data, determine the popularity of certain content and better
                understand online activity. Unless described in this Policy, we do not share, sell, rent
                or trade any of your information with third parties for their promotional purposes.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>Business Transfers.</b> We may share or transfer your information in connection with,
                or during negotiations of, any merger, sale of company assets, financing, or acquisition
                of all or a portion of our business to another company.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>Third-Party Advertisers.</b> We may use third-party advertising companies to serve
                ads when you visit the Services. These companies may use information about your visits
                to our Website(s) and other websites that are contained in web cookies and other tracking
                technologies in order to provide advertisements about goods and services of interest to you.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>Affiliates.</b> We may share your information with our affiliates, in which case we
                will require those affiliates to honor this privacy policy. Affiliates include our
                parent company and any subsidiaries, joint venture partners or other companies that
                we control or that are under common control with us.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>Business Partners.</b> We may share your information with our business partners to
                offer you certain products, services or promotions.
              </Typography>
            </li>
            <li>
              <Typography className={classes.mainDescription}>
                <b>Other Users.</b> When you share personal information (for example, by posting comments,
                contributions or other content to the Services) or otherwise interact with public areas of
                the Services, such personal information may be viewed by all users and may be publicly
                distributed outside the Services in perpetuity. Similarly, other users will be able to view
                descriptions of your activity, communicate with you within our Services, and view your profile.
              </Typography>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  const fourContainerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.containerTitle}>
          4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </Typography>

        <div className={classes.container}>
          <Typography className={classes.mainDescription}>
            <i><b>In Short:</b> We may use cookies and other tracking technologies to collect
            and store your information.</i>
          </Typography>
          <Typography className={classes.mainDescription}>
            We may use cookies and similar tracking technologies (like web beacons and pixels) to access
            or store information. Specific information about how we use such technologies and how you can
            refuse certain cookies is set out in our Cookie Policy.
          </Typography>
        </div>
      </div>
    )
  }

  const fiveContainerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.containerTitle}>
          5. HOW LONG DO WE KEEP YOUR INFORMATION?
        </Typography>

        <div className={classes.container}>
          <Typography className={classes.mainDescription}>
            <i><b>In Short:</b> We keep your information for as long as necessary to fulfill the purposes
            outlined in this privacy policy unless otherwise required by law.</i>
          </Typography>
          <Typography className={classes.mainDescription}>
            We will only keep your personal information for as long as it is necessary for the purposes set
            out in this privacy policy, unless a longer retention period is required or permitted by law
            (such as tax, accounting or other legal requirements). No purpose in this policy will require us
            keeping your personal information for longer than 2 years past the termination of the user's account.
          </Typography>
          <Typography className={classes.mainDescription}>
            When we have no ongoing legitimate business need to process your personal information, we will
            either delete or anonymize it, or, if this is not possible (for example, because your personal
            information has been stored in backup archives), then we will securely store your personal
            information and isolate it from any further processing until deletion is possible.
          </Typography>
        </div>
      </div>
    )
  }

  const sixContainerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.containerTitle}>
          6. HOW DO WE KEEP YOUR INFORMATION SAFE?
        </Typography>

        <div className={classes.container}>
          <Typography className={classes.mainDescription}>
            <i><b>In Short:</b> We aim to protect your personal information through a system of organizational
            and technical security measures.</i>
          </Typography>
          <Typography className={classes.mainDescription}>
            We have implemented appropriate technical and organizational security measures designed to protect
            the security of any personal information we process. However, please also remember that we cannot
            guarantee that the internet itself is 100% secure. Although we will do our best to protect your
            personal information, transmission of personal information to and from our Services is at your own risk.
            You should only access the services within a secure environment.
          </Typography>
        </div>
      </div>
    )
  }

  const sevenContainerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.containerTitle}>
          7. DO WE COLLECT INFORMATION FROM MINORS?
        </Typography>

        <div className={classes.container}>
          <Typography className={classes.mainDescription}>
            <i><b>In Short:</b> We do not knowingly collect data from or market to children under 18 years of age.</i>
          </Typography>
          <Typography className={classes.mainDescription}>
            We do not knowingly solicit data from or market to children under 18 years of age. By using the Services,
             you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent
             to such minor dependent’s use of the Services. If we learn that personal information from users less
             than 18 years of age has been collected, we will deactivate the account and take reasonable measures to
             promptly delete such data from our records. If you become aware of any data we have collected from children
             under age 18, please contact us at support@hellomerit.com.
          </Typography>
        </div>
      </div>
    )
  }

  const eightContainerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.containerTitle}>
          8. WHAT ARE YOUR PRIVACY RIGHTS?
        </Typography>

        <div className={classes.container}>
          <Typography className={classes.mainDescription}>
            <i><b>In Short:</b> You may review, change, or terminate your account at any time.</i>
          </Typography>
          <Typography className={classes.mainDescription}>
            If you are resident in the European Economic Area and you believe we are unlawfully processing
            your personal information, you also have the right to complain to your local data protection
            {'supervisory authority. You can find their contact details here: '}
            <a href='http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm'>
              http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
            </a>.
          </Typography>
        </div>

        <div className={classes.container}>
          <Typography className={classes.subTitle}>
            Account Information
          </Typography>
          <Typography className={classes.mainDescription}>
            If you would at any time like to review or change the information in your account or terminate
            your account, you can:
          </Typography>
          <ul>
            <li>
              <Typography className={classes.mainDescription}>
                Log into your account settings and update your user account.
              </Typography>
            </li>
          </ul>
          <Typography className={classes.mainDescription}>
            Upon your request to terminate your account, we will deactivate or delete your account and
            information from our active databases. However, some information may be retained in our files
            to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use
            and/or comply with legal requirements.
          </Typography>
          <Typography className={classes.mainDescription}>
            <b><u>Cookies and similar technologies:</u></b> Most Web browsers are set to accept cookies by
            default. If you prefer, you can usually choose to set your browser to remove cookies and to reject
            cookies. If you choose to remove cookies or reject cookies, this could affect certain features or
            services of our Services. To opt-out of interest-based advertising by advertisers on our Services
            {'visit '}
            <a href='http://www.aboutads.info/choices/'>http://www.aboutads.info/choices/</a>.
          </Typography>
          <Typography className={classes.mainDescription}>
            <b><u>Opting out of email marketing:</u></b> You can unsubscribe from our marketing email list
            at any time by clicking on the unsubscribe link in the emails that we send or by contacting us
            using the details provided below. You will then be removed from the marketing email list – however,
            we will still need to send you service-related emails that are necessary for the administration
            and use of your account. To otherwise opt-out, you may:
          </Typography>
          <ul>
            <li>
              <Typography className={classes.mainDescription}>
                Access your account settings and update preferences.
              </Typography>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  const nineContainerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.containerTitle}>
          9. CONTROLS FOR DO-NOT-TRACK FEATURES
        </Typography>

        <div className={classes.container}>
          <Typography className={classes.mainDescription}>
            Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track
             (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about
             your online browsing activities monitored and collected. No uniform technology standard for
             recognizing and implementing DNT signals has been finalized. As such, we do not currently respond
             to DNT browser signals or any other mechanism that automatically communicates your choice not to
             be tracked online. If a standard for online tracking is adopted that we must follow in the future,
             we will inform you about that practice in a revised version of this privacy policy.
          </Typography>
        </div>
      </div>
    )
  }

  const tenContainerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.containerTitle}>
          10. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
        </Typography>

        <div className={classes.container}>
          <Typography className={classes.mainDescription}>
            <i><b>In Short:</b> Yes, if you are a resident of California, you are granted specific rights regarding
            access to your personal information.</i>
          </Typography>
          <Typography className={classes.mainDescription}>
            California Civil Code Section 1798.83, also known as the “Shine The Light” law, permits our users
            who are California residents to request and obtain from us, once a year and free of charge, information
            about categories of personal information (if any) we disclosed to third parties for direct marketing
            purposes and the names and addresses of all third parties with which we shared personal information
            in the immediately preceding calendar year. If you are a California resident and would like to make
            such a request, please submit your request in writing to us using the contact information provided below.
          </Typography>
          <Typography className={classes.mainDescription}>
            If you are under 18 years of age, reside in California, and have a registered account with the Services,
            you have the right to request removal of unwanted data that you publicly post on the Services.
            To request removal of such data, please contact us using the contact information provided below, and
            include the email address associated with your account and a statement that you reside in California.
            We will make sure the data is not publicly displayed on the Services, but please be aware that the data
            may not be completely or comprehensively removed from our systems.
          </Typography>
        </div>
      </div>
    )
  }

  const elevenContainerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.containerTitle}>
          11. DO WE MAKE UPDATES TO THIS POLICY?
        </Typography>

        <div className={classes.container}>
          <Typography className={classes.mainDescription}>
            <i><b>In Short:</b> Yes, we will update this policy as necessary to stay compliant with relevant laws.</i>
          </Typography>
          <Typography className={classes.mainDescription}>
            We may update this privacy policy from time to time. The updated version will be indicated by an
            updated “Revised” date and the updated version will be effective as soon as it is accessible.
            If we make material changes to this privacy policy, we may notify you either by prominently posting
            a notice of such changes or by directly sending you a notification. We encourage you to review this
            privacy policy frequently to be informed of how we are protecting your information.
          </Typography>
        </div>
      </div>
    )
  }

  const tweleveContainerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.containerTitle}>
          12. HOW CAN YOU CONTACT US ABOUT THIS POLICY?
        </Typography>

        <div className={classes.container}>
          <Typography className={classes.mainDescription}>
            If you have questions or comments about this policy, you may email us at support@hellomerit.com
            or by post to:
          </Typography>
          <Typography className={classes.mainDescription}>
            Gratitude Software, Inc. <br />
            8 W 40th St, New York, NY 10018, USA<br />
            New York, NY 10018<br />
            United States
          </Typography>
        </div>
      </div>
    )
  }

  const footerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.containerTitle}>
          HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
        </Typography>

        <Typography className={classes.mainDescription}>
          Based on the laws of some countries, you may have the right to request access to the personal information
          we collect from you, change that information, or delete it in some circumstances. To request to review,
          update, or delete your personal information, please submit a request by emailing support@hellomerit.com.
          We will respond to your request within 30 days.
        </Typography>
      </div>
    )
  }

  return (
    <main className={classes.root}>
      <Typography className={classes.title}>
        Merit Privacy Policy
      </Typography>
      {headerRender()}
      {oneContainerRender()}
      {twoContainerRender()}
      {threeContainerRender()}
      {fourContainerRender()}
      {fiveContainerRender()}
      {sixContainerRender()}
      {sevenContainerRender()}
      {eightContainerRender()}
      {nineContainerRender()}
      {tenContainerRender()}
      {elevenContainerRender()}
      {tweleveContainerRender()}
      {footerRender()}
    </main>
  );
};

PrivacyPolicy.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrivacyPolicy);
