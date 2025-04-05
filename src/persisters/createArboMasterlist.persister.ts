import { EncryptCreateArboMasterlist } from '../model/crypt/createArboMasterlistCrypt.model.ts';
import DB from '../service/db.service.ts';

const insertArboMasterList = async (param: EncryptCreateArboMasterlist[]) => {
  const query = `INSERT INTO arbo_masterlist (
      id,
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
      vlcep, 
      vlfed,
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
      remarks,
      status,
      time_stamp
  )
  VALUES ?`;

  const values = param.map((item) => [
    item.id,
    item.region_name,
    item.region_code,
    item.province_name,
    item.province_code,
    item.muncity_name,
    item.muncity_code,
    item.barangay_name,
    item.barangay_code,
    item.cd,
    item.arc_type,
    item.arc_id,
    item.arc_name,
    item.arc_cluster_name,
    item.arbo_name,
    item.arbo_id,
    item.oma_level_2013,
    item.itema_status_2019,
    item.itema_level_2019,
    item.itema_status_current,
    item.itema_level_current,
    item.organization_status,
    item.organization_type,
    item.year_organized,
    item.registering_agency,
    item.year_registration,
    item.baseline_members,
    item.baseline_members_male,
    item.baseline_members_female,
    item.baseline_total_arbs,
    item.baseline_male_arbs,
    item.baseline_female_arbs,
    item.baseline_total_nonarbs,
    item.baseline_male_nonarbs,
    item.baseline_female_nonarbs,
    item.current_members,
    item.current_members_male,
    item.current_members_female,
    item.current_total_arbs,
    item.current_male_arbs,
    item.current_female_arbs,
    item.current_total_nonarbs,
    item.current_male_nonarbs,
    item.current_female_nonarbs,
    item.cbu_current,
    item.cbu_mem_current,
    item.savings_current,
    item.sav_mem_current,
    item.assets_current,
    item.liabilities_current,
    item.services_provided,
    item.trainings_cap_dev,
    item.apcp,
    item.linksfarm,
    item.up_valuing,
    item.cp_wash,
    item.coop_strengthening,
    item.vlcep,
    item.vlfed,
    item.pbd_lawyering,
    item.social_entrep,
    item.sustainable_debris,
    item.sustainable_livelihood,
    item.climate_proofing,
    item.pahp,
    item.cbvcd,
    item.fbs,
    item.pilot_climate_proof,
    item.cap_pbd,
    item.card,
    item.watsan,
    item.pablo,
    item.micoop,
    item.malp,
    item.csf,
    item.aes,
    item.bds,
    item.pamana,
    item.bub_dar,
    item.arf,
    item.sbfp,
    item.claap,
    item.arbold,
    item.total_1,
    item.arcdp_i,
    item.arcdp_ii,
    item.arcp_i,
    item.arcp_ii,
    item.arisp_i,
    item.arisp_ii,
    item.arisp_iii,
    item.bcsea_bazal,
    item.bcsea_umiray,
    item.birasp,
    item.cmarprp,
    item.converge,
    item.iarcdsp,
    item.minsaad,
    item.nmciremp,
    item.papsra,
    item.spots,
    item.spots_ii,
    item.starcm,
    item.tpkp,
    item.wmcip,
    item.total_2,
    item.grand_total,
    item.remarks,
    item.status,
    item.time_stamp,
  ]);

  await DB.execute(query, [values]);
};

export default insertArboMasterList;
