export interface User {
  id: string;
  nidn: string;
  name: string;
  email: string;
  facultyId: string;
  facultyName: string;
  studyProgram?: string;
  role: UserRole;
  avatarUrl?: string;
}

export type UserRole =
  | 'DOSEN'
  | 'REVIEWER'
  | 'OPERATOR_FK'
  | 'ADMIN_FK'
  | 'KETUA_LPPM'
  | 'ADMIN_SISTEM';

export type ProposalType = 'PENELITIAN' | 'PENGABDIAN';
export type ProposalStatus = 'DRAFT' | 'DIAJUKAN' | 'DIVERIFIKASI' | 'DIREVIEW' | 'DITERIMA' | 'DITOLAK' | 'REVISI' | 'SELESAI';

export interface Proposal {
  id: string;
  title: string;
  type: ProposalType;
  schemeId: string;
  schemeName: string;
  fieldOfStudy: string;
  year: number;
  duration: number; // bulan
  budget: number;
  status: ProposalStatus;
  submittedAt: string;
  updatedAt: string;
  bidangIlmu?: 'Saintek' | 'Soshum' | 'Kesehatan' | 'Bahasa';
  submitter: Pick<User, 'id' | 'nidn' | 'name' | 'facultyName'>;
  members: TeamMember[];
  budgetDetails: BudgetItem[];
  files: ProposalFile[];
  outputs: ExpectedOutput[];
  statusHistory: StatusHistoryEntry[];
  reviewers?: Pick<User, 'id' | 'nidn' | 'name' | 'facultyName'>[];
  facultyId: string;
  facultyName: string;
}

export interface TeamMember {
  id: string;
  nidn?: string;          // null untuk mahasiswa/eksternal
  name: string;
  faculty?: string;       // null untuk eksternal
  role: 'KETUA' | 'ANGGOTA_DOSEN' | 'ANGGOTA_MAHASISWA' | 'ANGGOTA_LAIN';
  studyProgram?: string;
}

export interface BudgetItem {
  id: string;
  description: string;
  amount: number;
}

export interface ProposalFile {
  id: string;
  category: 'PROPOSAL' | 'SURAT_PERNYATAAN' | 'CV_KETUA' | 'LAMPIRAN' | 'LAPORAN_AKHIR' | 'REVISI';
  fileName: string;
  fileSize: number;
  url: string;
  uploadedAt: string;
}

export interface ExpectedOutput {
  id: string;
  type: 'PUBLIKASI' | 'HKI' | 'PRODUK' | 'LAINNYA';
  hkiData?: HKIData;
  publicationData?: PublicationData;
  description?: string;
}

export interface HKIData {
  hkiType: 'PATEN' | 'HAK_CIPTA' | 'MEREK_DAGANG';
  applicationNumber: string;
  protectionStatus: 'DIAJUKAN' | 'DIBERIKAN' | 'LAINNYA';
  fileUrl?: string;
}

export interface PublicationData {
  title: string;
  journalName: string;
  volume?: string;
  doi?: string;
  url?: string;
}

export interface StatusHistoryEntry {
  id: string;
  fromStatus: ProposalStatus;
  toStatus: ProposalStatus;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  note?: string;
  timestamp: string;
}

export interface Scheme {
  id: string;
  code: string;
  name: string;
  type: ProposalType;
  budgetCeiling?: number;
  openDate: string;
  closeDate: string;
  isActive: boolean;
  description?: string;
}

export interface StudyProgram {
  id: string;
  code: string;
  name: string;
  facultyId: string;
  facultyName: string;
  lecturerCount: number;
  isActive: boolean;
}

export interface FacultyStats {
  facultyId: string;
  facultyName: string;
  totalProposals: number;
  accepted: number;
  rejected: number;
  ongoing: number;
  completed: number;
  totalBudget: number;
  hkiCount: number;
}

export interface SchemeStats {
  schemeId: string;
  schemeName: string;
  totalProposals: number;
  accepted: number;
  budgetAllocated: number;
  budgetUsed: number;
}

export interface AuditLog {
  id: string;
  entityType: 'PROPOSAL' | 'SCHEME' | 'STUDY_PROGRAM' | 'USER';
  entityId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'STATUS_CHANGE' | 'VERIFY' | 'REJECT';
  actorId: string;
  actorName: string;
  oldValue?: string;
  newValue?: string;
  timestamp: string;
}

export interface Deadline {
  id: string;
  title: string;
  type: ProposalType;
  openDate: string;
  closeDate: string;
  isActive: boolean;
}
