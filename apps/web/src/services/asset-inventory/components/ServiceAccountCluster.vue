<script setup lang="ts">
import {
    computed, onMounted, onUnmounted, reactive,
} from 'vue';

import {
    PPaneLayout, PHeading, PButton, PEmpty, PDataLoader, PButtonModal, PDoubleCheckModal,
} from '@spaceone/design-system';

import type { AgentModel } from '@/schema/identity/agent/model';
import { i18n } from '@/translations';

import ServiceAccountAddClusterModal from '@/services/asset-inventory/components/ServiceAccountAddClusterModal.vue';
import ServiceAccountClusterDetail
    from '@/services/asset-inventory/components/ServiceAccountClusterDetail.vue';
import { useServiceAccountAgentStore } from '@/services/asset-inventory/stores/service-account-agent-store';

interface Props {
    serviceAccountId: string;
    loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    loading: true,
});
const serviceAccountAgentStore = useServiceAccountAgentStore();

const storeState = reactive({
    loading: computed(() => serviceAccountAgentStore.state.loading),
    isAgentCreated: computed(() => serviceAccountAgentStore.getters.isAgentCreated),
    isClusterConnected: computed(() => serviceAccountAgentStore.getters.isClusterConnected),
    agentData: computed<AgentModel|undefined>(() => serviceAccountAgentStore.state.agentInfo),
});

const state = reactive({
    title: computed(() => (storeState.isAgentCreated ? i18n.t('INVENTORY.SERVICE_ACCOUNT.AGENT.CLUSTER_DETAIL_HEADER') : i18n.t('INVENTORY.SERVICE_ACCOUNT.AGENT.CONNECT_CLUSTER_HEADER'))),
    isClusterActive: computed(() => (storeState.agentData?.state === 'ENABLED')),
});

const modalState = reactive({
    addClusterModalType: 'ADD' as 'ADD' | 'REGENERATE',
    addClusterModalVisible: false,
    connectionModalVisible: false,
    deleteClusterModalVislble: false,
});

const handleOpenAddClusterModal = () => {
    modalState.addClusterModalType = 'ADD';
    modalState.addClusterModalVisible = true;
};
const handleOpenClusterConnectionModal = () => {
    modalState.connectionModalVisible = true;
};
const handleOpenRegenerateClusterModal = async () => {
    modalState.addClusterModalType = 'REGENERATE';
    modalState.addClusterModalVisible = true;
    await serviceAccountAgentStore.regenerateAgent(props.serviceAccountId);
};
const handleOpenDeleteClusterModal = () => {
    modalState.deleteClusterModalVislble = true;
};
const handleConfirmClusterConnection = async () => {
    if (state.isClusterActive) {
        await serviceAccountAgentStore.disableAgent(props.serviceAccountId);
    } else {
        await serviceAccountAgentStore.enableAgent(props.serviceAccountId);
    }
    modalState.connectionModalVisible = false;
};
const handleConfirmDeleteCluster = async () => {
    await serviceAccountAgentStore.deleteAgent(props.serviceAccountId);
    modalState.deleteClusterModalVislble = false;
};

onMounted(async () => {
    await serviceAccountAgentStore.getAgent(props.serviceAccountId);
});

onUnmounted(() => {
    serviceAccountAgentStore.setAgentInfo(undefined);
});


</script>

<template>
    <p-pane-layout class="service-account-connect-cluster">
        <p-heading heading-type="sub"
                   :title="state.title"
        >
            <template #extra>
                <div v-if="storeState.isAgentCreated"
                     class="button-wrapper"
                >
                    <p-button v-if="storeState.isClusterConnected"
                              style-type="tertiary"
                              @click="handleOpenClusterConnectionModal"
                    >
                        {{ state.isClusterActive ? $t('INVENTORY.SERVICE_ACCOUNT.AGENT.DEACTIVATE') : $t('INVENTORY.SERVICE_ACCOUNT.AGENT.ACTIVATE') }}
                    </p-button>
                    <p-button icon-left="ic_renew"
                              style-type="tertiary"
                              @click="handleOpenRegenerateClusterModal"
                    >
                        {{ $t('INVENTORY.SERVICE_ACCOUNT.AGENT.RECONNECT') }}
                    </p-button>
                    <p-button icon-left="ic_delete"
                              style-type="tertiary"
                              @click="handleOpenDeleteClusterModal"
                    >
                        {{ $t('INVENTORY.SERVICE_ACCOUNT.AGENT.DELETE') }}
                    </p-button>
                </div>
            </template>
        </p-heading>
        <p-data-loader :loading="storeState.loading"
                       class="content-wrapper"
        >
            <service-account-cluster-detail v-if="storeState.isAgentCreated" />
            <div v-else
                 class="not-been-connected-yet"
            >
                <p-empty class="empty-content"
                         show-image
                         show-button
                >
                    <template #image>
                        <img class="empty-image"
                             alt="empty-default-image"
                             src="@/assets/images/img_ghost_no-connection.png"
                        >
                    </template>
                    <p class="empty-text">
                        {{ $t('INVENTORY.SERVICE_ACCOUNT.AGENT.DISCONNECTED_CLUSTER_TEXT') }}
                    </p>
                    <template #button>
                        <p-button style-type="primary"
                                  icon-left="ic_plus_bold"
                                  @click="handleOpenAddClusterModal"
                        >
                            {{ $t('INVENTORY.SERVICE_ACCOUNT.AGENT.CONNECT_CLUSTER') }}
                        </p-button>
                    </template>
                </p-empty>
            </div>
        </p-data-loader>
        <service-account-add-cluster-modal :visible.sync="modalState.addClusterModalVisible"
                                           :type="modalState.addClusterModalType"
                                           :service-account-id="props.serviceAccountId"
                                           :add-cluster-modal-type="modalState.addClusterModalType"
        />
        <p-button-modal class="cluster-connection-modal"
                        size="sm"
                        :visible.sync="modalState.connectionModalVisible"
                        :theme-color="state.isClusterActive ? 'alert' : 'primary'"
                        :header-title="state.isClusterActive ? $t('INVENTORY.SERVICE_ACCOUNT.AGENT.DEACTIVATE_MODAL_TEXT') : $t('INVENTORY.SERVICE_ACCOUNT.AGENT.ACTIVATE_MODAL_TEXT')"
                        @confirm="handleConfirmClusterConnection"
        />
        <p-double-check-modal class="cluster-delete-modal"
                              modal-size="sm"
                              :visible.sync="modalState.deleteClusterModalVislble"
                              :header-title="$t('INVENTORY.SERVICE_ACCOUNT.AGENT.DELETE_CLUSTER_MODAL_TEXT')"
                              :verification-text="storeState.agentData?.options?.cluster_name"
                              @confirm="handleConfirmDeleteCluster"
        />
    </p-pane-layout>
</template>

<style scoped lang="postcss">
.service-account-connect-cluster {
    .button-wrapper {
        @apply flex gap-4;
    }
    .content-wrapper {
        min-height: 10rem;
        padding-top: 0.5rem;
        padding-bottom: 2.5rem;
        .service-account-credentials-form {
            padding-left: 1rem;
            padding-right: 1rem;
        }

        .button-wrapper {
            padding-left: 1rem;
            margin-top: 2rem;
        }

        .not-been-connected-yet {
            @apply flex flex-col items-center w-full;

            .empty-content {
                padding: 1.5rem 0;

                .empty-image {
                    opacity: 50%;
                }

                .empty-text {
                    @apply text-gray-300 text-paragraph-md;
                }
            }
        }
    }
}
</style>
