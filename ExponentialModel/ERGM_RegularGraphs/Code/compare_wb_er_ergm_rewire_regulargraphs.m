% will compare the number of triangles generated for regular graphs
% generated by ERGM and simple-rewiring to see if the ERGM converges to the
% correct number of triangles as degree increases 

% graphs found by Erich and Weibin.
er = '/Users/erich/Documents/Programming/Research/Bassler/Summer 2015-Summer 2016/ExponentialModel/ERGM_RegularGraphs/results_2017_08_09_ccg/';
ers = 'ERGM_RG_N316r1000d*';

wb = '/Users/erich/Documents/Programming/Research/Bassler/Summer 2015-Summer 2016/WeibinResults/N316regular/';
wbs = 'triangle_compare_ChungLu_Vs_SNM_N316D*SqTotal1000.txt';

cd(er);
erf = dir(ers);

cd(wb);
wbf = dir(wbs);

ertri = NaN([1,316]);
ertri_std = NaN([1,316]);
ertri_min = NaN([1,316]);
ertri_max = NaN([1,316]);

wbtri = NaN([1,316]);
wbtri_std = NaN([1,316]);
wbtri_min = NaN([1,316]);
wbtri_max = NaN([1,316]);

erccg = NaN([1,316]);
erccg_std = NaN([1,316]);
erccg_min = NaN([1,316]);
erccg_max = NaN([1,316]);

wbccg = NaN([1,316]);
wbccg_std = NaN([1,316]);
wbccg_min = NaN([1,316]);
wbccg_max = NaN([1,316]);


for i = 1:1:273
    %er
    cd(er);
    er_name = string(erf(i).name);
    disp(er_name);
    er_data = dlmread(er_name);
    er_tri = er_data(:,2);
    
    %wb
    cd(wb)
    
    wb_name = string(wbf(i).name);
    disp(wb_name);
    wb_data = dlmread(wb_name,' ',1,0);
    wb_tri = wb_data(:,2);
    
    % get index
    wb_name = replace(wb_name,'triangle_compare_ChungLu_Vs_SNM_N316D','');
    wb_name = replace(wb_name, 'SqTotal1000.txt','');
    indwb = int32(str2double(wb_name))+1;

    er_name = replace(er_name,'ERGM_RG_N316r1000d','');
    er_name = replace(er_name, '.txt','');
    inder = int32(str2double(er_name))+1;
    
    % store
    ertri(inder) = mean(er_tri);
    ertri_std(inder) = std(er_tri);
    ertri_min(inder) = min(er_tri);
    ertri_max(inder) = max(er_tri);

    wbtri(indwb) = mean(wb_tri);
    wbtri_std(indwb) = std(wb_tri);
    wbtri_min(indwb) = min(wb_tri);
    wbtri_max(indwb) = max(wb_tri);
    
    erccg(inder) = mean(er_data(:,3));
    erccg_std(inder) = std(er_data(:,3));
    erccg_min(inder) = min(er_data(:,3));
    erccg_max(inder) = max(er_data(:,3));
    
    wbccg(indwb) = mean(wb_data(:,6));
    wbccg_std(indwb) = std(wb_data(:,6));
    wbccg_min(indwb) = min(wb_data(:,6));
    wbccg_max(indwb) = max(wb_data(:,6));
    
    
end

clear erf er_tri ers i wb wbs wbf wb_tri er *ind* *name* *data*