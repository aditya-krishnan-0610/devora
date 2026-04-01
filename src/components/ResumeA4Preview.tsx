import { ResumeData, ImprovedResume } from '@/lib/types';

export type TemplateType = 'basic' | 'modern';

interface Props {
  data: ResumeData;
  improved: ImprovedResume;
  template: TemplateType;
}

const BasicTemplate = ({ data, improved }: Omit<Props, 'template'>) => (
  <div className="font-['Times_New_Roman',serif] text-[11px] leading-[1.4] text-black">
    {/* Header */}
    <div className="text-center border-b-2 border-black pb-2 mb-3">
      <h1 className="text-[20px] font-bold uppercase tracking-[2px]">{data.fullName}</h1>
      <p className="text-[10px] mt-1 text-gray-700">
        {[data.phone, data.email].filter(Boolean).join(' | ')}
      </p>
      {(data.linkedin || data.github) && (
        <p className="text-[10px] text-gray-700">
          {[data.linkedin, data.github].filter(Boolean).join(' | ')}
        </p>
      )}
    </div>

    {/* Summary */}
    {improved.summary && (
      <div className="mb-3">
        <h2 className="text-[12px] font-bold uppercase border-b border-gray-400 pb-0.5 mb-1.5">Professional Summary</h2>
        <p className="text-[10.5px] leading-[1.5]">{improved.summary}</p>
      </div>
    )}

    {/* Skills */}
    {improved.skills.length > 0 && (
      <div className="mb-3">
        <h2 className="text-[12px] font-bold uppercase border-b border-gray-400 pb-0.5 mb-1.5">Skills</h2>
        {improved.skills.map((cat, i) => (
          <p key={i} className="text-[10.5px]"><strong>{cat.category}:</strong> {cat.items.join(', ')}</p>
        ))}
      </div>
    )}

    {/* Experience */}
    {improved.experience.length > 0 && (
      <div className="mb-3">
        <h2 className="text-[12px] font-bold uppercase border-b border-gray-400 pb-0.5 mb-1.5">Experience</h2>
        {improved.experience.map((exp, i) => (
          <div key={i} className="mb-2">
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-[11px]">{exp.position}</span>
              <span className="text-[9.5px] text-gray-600">{exp.startDate} – {exp.endDate}</span>
            </div>
            <p className="text-[10px] italic text-gray-600">{exp.company}</p>
            <ul className="mt-0.5 ml-3 list-disc">
              {exp.bullets.map((b, bi) => (
                <li key={bi} className="text-[10.5px] leading-[1.4]">{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}

    {/* Projects */}
    {improved.projects.length > 0 && (
      <div className="mb-3">
        <h2 className="text-[12px] font-bold uppercase border-b border-gray-400 pb-0.5 mb-1.5">Projects</h2>
        {improved.projects.map((p, i) => (
          <div key={i} className="mb-2">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-[11px]">{p.name}</span>
              {p.technologies.length > 0 && (
                <span className="text-[9.5px] text-gray-500">({p.technologies.join(', ')})</span>
              )}
            </div>
            <p className="text-[10.5px] leading-[1.4]">{p.description}</p>
          </div>
        ))}
      </div>
    )}

    {/* Education */}
    {improved.education.length > 0 && (
      <div className="mb-3">
        <h2 className="text-[12px] font-bold uppercase border-b border-gray-400 pb-0.5 mb-1.5">Education</h2>
        {improved.education.map((edu, i) => (
          <div key={i} className="mb-1">
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-[11px]">{edu.degree} in {edu.field}</span>
              {edu.year && <span className="text-[9.5px] text-gray-600">{edu.year}</span>}
            </div>
            <p className="text-[10px] text-gray-600">
              {edu.institution}{edu.gpa ? ` | CGPA: ${edu.gpa}` : ''}
            </p>
          </div>
        ))}
      </div>
    )}

    {/* Certifications */}
    {improved.certifications.length > 0 && (
      <div>
        <h2 className="text-[12px] font-bold uppercase border-b border-gray-400 pb-0.5 mb-1.5">Certifications</h2>
        <ul className="ml-3 list-disc">
          {improved.certifications.map((c, i) => (
            <li key={i} className="text-[10.5px]">{c}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const ModernTemplate = ({ data, improved }: Omit<Props, 'template'>) => (
  <div className="font-['Inter',sans-serif] text-[10.5px] leading-[1.45] text-black">
    {/* Header with accent */}
    <div className="bg-[#1a365d] text-white -mx-[40px] -mt-[40px] px-[40px] pt-[28px] pb-[16px] mb-4 rounded-b-none">
      <h1 className="text-[22px] font-bold tracking-wide">{data.fullName}</h1>
      <div className="flex flex-wrap gap-3 mt-1.5 text-[9.5px] text-blue-200">
        {data.phone && <span>{data.phone}</span>}
        {data.email && <span>{data.email}</span>}
        {data.linkedin && <span>{data.linkedin}</span>}
        {data.github && <span>{data.github}</span>}
      </div>
    </div>

    {/* Summary */}
    {improved.summary && (
      <div className="mb-3.5">
        <h2 className="text-[11.5px] font-semibold text-[#1a365d] uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <span className="w-3 h-[2px] bg-[#1a365d] inline-block"></span>
          Professional Summary
        </h2>
        <p className="text-[10.5px] leading-[1.55] text-gray-700">{improved.summary}</p>
      </div>
    )}

    {/* Skills */}
    {improved.skills.length > 0 && (
      <div className="mb-3.5">
        <h2 className="text-[11.5px] font-semibold text-[#1a365d] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <span className="w-3 h-[2px] bg-[#1a365d] inline-block"></span>
          Skills
        </h2>
        <div className="space-y-0.5">
          {improved.skills.map((cat, i) => (
            <p key={i} className="text-[10.5px]">
              <span className="font-semibold text-[#1a365d]">{cat.category}:</span>{' '}
              <span className="text-gray-700">{cat.items.join(' · ')}</span>
            </p>
          ))}
        </div>
      </div>
    )}

    {/* Experience */}
    {improved.experience.length > 0 && (
      <div className="mb-3.5">
        <h2 className="text-[11.5px] font-semibold text-[#1a365d] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <span className="w-3 h-[2px] bg-[#1a365d] inline-block"></span>
          Experience
        </h2>
        {improved.experience.map((exp, i) => (
          <div key={i} className="mb-2.5 pl-2 border-l-2 border-blue-100">
            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-[11px] text-gray-900">{exp.position}</span>
              <span className="text-[9px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{exp.startDate} – {exp.endDate}</span>
            </div>
            <p className="text-[9.5px] text-[#1a365d] font-medium">{exp.company}</p>
            <ul className="mt-0.5 space-y-0.5">
              {exp.bullets.map((b, bi) => (
                <li key={bi} className="text-[10px] text-gray-700 flex items-start gap-1.5">
                  <span className="text-[#1a365d] mt-[3px] text-[6px]">▸</span>{b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}

    {/* Projects */}
    {improved.projects.length > 0 && (
      <div className="mb-3.5">
        <h2 className="text-[11.5px] font-semibold text-[#1a365d] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <span className="w-3 h-[2px] bg-[#1a365d] inline-block"></span>
          Projects
        </h2>
        {improved.projects.map((p, i) => (
          <div key={i} className="mb-2 pl-2 border-l-2 border-blue-100">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-[11px] text-gray-900">{p.name}</span>
              {p.technologies.length > 0 && (
                <span className="text-[8.5px] text-[#1a365d] bg-blue-50 px-1 py-0.5 rounded">
                  {p.technologies.join(' · ')}
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-700 leading-[1.45]">{p.description}</p>
          </div>
        ))}
      </div>
    )}

    {/* Education */}
    {improved.education.length > 0 && (
      <div className="mb-3">
        <h2 className="text-[11.5px] font-semibold text-[#1a365d] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <span className="w-3 h-[2px] bg-[#1a365d] inline-block"></span>
          Education
        </h2>
        {improved.education.map((edu, i) => (
          <div key={i} className="mb-1 pl-2 border-l-2 border-blue-100">
            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-[11px]">{edu.degree} in {edu.field}</span>
              {edu.year && <span className="text-[9px] text-gray-500">{edu.year}</span>}
            </div>
            <p className="text-[9.5px] text-gray-600">
              {edu.institution}{edu.gpa ? ` · CGPA: ${edu.gpa}` : ''}
            </p>
          </div>
        ))}
      </div>
    )}

    {/* Certifications */}
    {improved.certifications.length > 0 && (
      <div>
        <h2 className="text-[11.5px] font-semibold text-[#1a365d] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <span className="w-3 h-[2px] bg-[#1a365d] inline-block"></span>
          Certifications
        </h2>
        <ul className="space-y-0.5">
          {improved.certifications.map((c, i) => (
            <li key={i} className="text-[10px] text-gray-700 flex items-start gap-1.5">
              <span className="text-[#1a365d] mt-[3px] text-[6px]">▸</span>{c}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const ResumeA4Preview = ({ data, improved, template }: Props) => {
  return (
    <div
      id="resume-a4-preview"
      className="bg-white shadow-2xl mx-auto"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '40px',
        boxSizing: 'border-box',
        color: '#000',
      }}
    >
      {template === 'modern' ? (
        <ModernTemplate data={data} improved={improved} />
      ) : (
        <BasicTemplate data={data} improved={improved} />
      )}
    </div>
  );
};

export default ResumeA4Preview;
