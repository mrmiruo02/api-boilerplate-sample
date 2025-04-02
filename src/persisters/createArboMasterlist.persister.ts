import { ENCRYPT_ARBO_MASTERLIST } from '../model/createArboMasterlist.model.ts';
import DB from './db.service.ts';

const insertArboMasterList = async (param: ENCRYPT_ARBO_MASTERLIST) => {
  const query = `INSERT INTO arbo_masterlist (
    region_name, 
    region_code, 
    province_name, 
    province_code,
    muncity_name, 
    muncity_code, 
    barangay_name, 
    barangay_code, 
    cd, 
    arc_type, 
    arc_id, 
    arc_name, 
    arc_cluster_name, 
    arbo_name, 
    arbo_id, 
    oma_level_2013, 
    itema_status_2019, 
    itema_level_2019, 
    itema_status_current, 
    itema_level_current, 
    organization_status, 
    organization_type, 
    year_organized, 
    registering_agency, 
    year_registration, 
    baseline_members, 
    baseline_members_male, 
    baseline_members_female, 
    baseline_total_arbs, 
    baseline_male_arbs, 
    baseline_female_arbs, 
    baseline_total_nonarbs, 
    baseline_male_nonarbs, 
    baseline_female_nonarbs, 
    current_members, 
    current_members_male, 
    current_members_female, 
    current_total_arbs, 
    current_male_arbs, 
    current_female_arbs, 
    current_total_nonarbs, 
    current_male_nonarbs, 
    current_female_nonarbs, 
    cbu_current, 
    cbu_mem_current, 
    savings_current, 
    sav_mem_current, 
    assets_current, 
    liabilities_current, 
    services_provided, 
    trainings_cap_dev, 
    apcp, 
    linksfarm, 
    up_valuing, 
    cp_wash, 
    coop_strengthening, 
    vlcep, vlfed, 
    pbd_lawyering, 
    social_entrep, 
    sustainable_debris, 
    sustainable_livelihood, 
    climate_proofing, 
    pahp, 
    cbvcd, 
    fbs, 
    pilot_climate_proof, 
    cap_pbd, 
    card, 
    watsan, 
    pablo, 
    micoop, 
    malp, 
    csf, 
    aes, 
    bds, 
    pamana, 
    bub_dar, 
    arf, 
    sbfp, 
    claap, 
    arbold, 
    total_1, 
    arcdp_i, 
    arcdp_ii, 
    arcp_i, 
    arcp_ii, 
    arisp_i, 
    arisp_ii, 
    arisp_iii, 
    bcsea_bazal, 
    bcsea_umiray, 
    birasp, 
    cmarprp, 
    converge, 
    iarcdsp, 
    minsaad, 
    nmciremp, 
    papsra, 
    spots, 
    spots_ii, 
    starcm, 
    tpkp, 
    wmcip, 
    total_2, 
    grand_total, 
    remarks, status
) 
VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?, ?, ?, ?
)`;
  const values = [
    param.region_name,
    param.region_code,
    param.province_name,
    param.province_code,
    param.muncity_name,
    param.muncity_code,
    param.barangay_name,
    param.barangay_code,
    param.cd,
    param.arc_type,
    param.arc_id,
    param.arc_name,
    param.arc_cluster_name,
    param.arbo_name,
    param.arbo_id,
    param.oma_level_2013,
    param.itema_status_2019,
    param.itema_level_2019,
    param.itema_status_current,
    param.itema_level_current,
    param.organization_status,
    param.organization_type,
    param.year_organized,
    param.registering_agency,
    param.year_registration,
    param.baseline_members,
    param.baseline_members_male,
    param.baseline_members_female,
    param.baseline_total_arbs,
    param.baseline_male_arbs,
    param.baseline_female_arbs,
    param.baseline_total_nonarbs,
    param.baseline_male_nonarbs,
    param.baseline_female_nonarbs,
    param.current_members,
    param.current_members_male,
    param.current_members_female,
    param.current_total_arbs,
    param.current_male_arbs,
    param.current_female_arbs,
    param.current_total_nonarbs,
    param.current_male_nonarbs,
    param.current_female_nonarbs,
    param.cbu_current,
    param.cbu_mem_current,
    param.savings_current,
    param.sav_mem_current,
    param.assets_current,
    param.liabilities_current,
    param.services_provided,
    param.trainings_cap_dev,
    param.apcp,
    param.linksfarm,
    param.up_valuing,
    param.cp_wash,
    param.coop_strengthening,
    param.vlcep,
    param.vlfed,
    param.pbd_lawyering,
    param.social_entrep,
    param.sustainable_debris,
    param.sustainable_livelihood,
    param.climate_proofing,
    param.pahp,
    param.cbvcd,
    param.fbs,
    param.pilot_climate_proof,
    param.cap_pbd,
    param.card,
    param.watsan,
    param.pablo,
    param.micoop,
    param.malp,
    param.csf,
    param.aes,
    param.bds,
    param.pamana,
    param.bub_dar,
    param.arf,
    param.sbfp,
    param.claap,
    param.arbold,
    param.total_1,
    param.arcdp_i,
    param.arcdp_ii,
    param.arcp_i,
    param.arcp_ii,
    param.arisp_i,
    param.arisp_ii,
    param.arisp_iii,
    param.bcsea_bazal,
    param.bcsea_umiray,
    param.birasp,
    param.cmarprp,
    param.converge,
    param.iarcdsp,
    param.minsaad,
    param.nmciremp,
    param.papsra,
    param.spots,
    param.spots_ii,
    param.starcm,
    param.tpkp,
    param.wmcip,
    param.total_2,
    param.grand_total,
    param.remarks,
    param.status,
  ];
  await DB.execute(query, values);
};

export default insertArboMasterList;
