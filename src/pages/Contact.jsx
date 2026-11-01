import { useData } from '../lib/data.js';
import PageHeader from '../components/PageHeader.jsx';
import TaskList from '../components/TaskList.jsx';
import './Contact.css';

/*
  CONTACT US PAGE
  Owner:   Dev E
  Branch:  feature/contact
  Figma:   D-10 Contact · M-10
  Data:    public/data/ contact.json, pages.json → contact
  Tasks:   docs/TASKS.md → Contact Us

  Only edit this file and Contact.css on your branch.
  Shared pieces you can use (do not edit them; ask the lead):
    useData('file')           load public/data/file.json
    asset('/images/…')        image path that works everywhere
    href('/route')            "#/route" for <a href>
    <PageHeader>, <Reveal>, <Icon>, <WatchCard>, useWatchPopup()
*/
export default function Contact() {
  const page = useData('pages');
  if (!page) return <div className="loading">Loading…</div>;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', route: '/' }, { label: 'Contact Us' }]}
        title={page.contact.title}
        intro={page.contact.intro}
      />
      <TaskList
        owner="Dev E"
        branch="feature/contact"
        figma="D-10 Contact · M-10"
        data="contact.json, pages.json → contact"
        tasks={[
          'REQUIRED by the brief: info cards with email, phone, address and hours (contact.json infoCards, links use href).',
          'Enquiry form built from contact.json form.fields (text, email, tel, select, textarea).',
          "Validation on submit using each field's required / minLength / pattern / email rules; show the field's error message under it.",
          'No backend: on success show form.successMessage as a toast and clear the form.',
        ]}
      />
    </>
  );
}
